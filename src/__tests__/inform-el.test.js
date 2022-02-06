const tick = async () => {
    return new Promise(resolve => setTimeout(resolve, 0));
};

const type = (input, text, blur) => {
    input.value = text;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    if (blur) {
        input.dispatchEvent(new Event('change', { bubbles: true }));
    }

};

const setDOM = async (domStr) => {
    document.body.innerHTML = domStr;
    await tick();

    return document.querySelector('inform-el');
};

const isElementVisible = (elem) => {
    return !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
};

test('The form is set to novalidate', async () => {
    const informEl = await setDOM(`
        <inform-el>
            <form>
                <input type="text" name="some-name" />
                <button type="submit">Submit</button>
            </form>
        </inform-el>
    `);

    const form = informEl.querySelector('form[novalidate]');
    expect(form).toBeTruthy();

    // Form is valid
    expect(informEl.classList.contains('invalid')).toBe(false);
    expect(informEl.querySelector('[type="submit"]').disabled).toBe(false);
});

test('"invalid" class is set when form is invalid', async () => {
    const informEl = await setDOM(`
        <inform-el>
            <form>
                <input type="text" name="some-name" required/>
                <input type="text" name="some-description" required/>
                <button type="submit">Submit</button>
            </form>
        </inform-el>
    `);

    // Form is invalid and submit button is disabled
    expect(informEl.classList.contains('invalid')).toBe(true);
    expect(informEl.querySelector('[type="submit"]').disabled).toBe(true);


    type(informEl.querySelector('[name="some-name"]'), "value1");

    // Still invalid
    expect(informEl.classList.contains('invalid')).toBe(true);
    expect(informEl.querySelector('[type="submit"]').disabled).toBe(true);


    type(informEl.querySelector('[name="some-description"]'), "value2");

    // Valid now
    expect(informEl.classList.contains('invalid')).toBe(false);
    expect(informEl.querySelector('[type="submit"]').disabled).toBe(false);


    // Remove value => invalid
    type(informEl.querySelector('[name="some-description"]'), "");
    expect(informEl.classList.contains('invalid')).toBe(true);
    expect(informEl.querySelector('[type="submit"]').disabled).toBe(true);

});

test('no-error-disable', async () => {
    // Attribute not set initially
    let informEl = await setDOM(`
        <inform-el>
            <form>
                <input type="text" name="some-name" required/>
                <button type="submit">Submit</button>
            </form>
        </inform-el>
    `);

    // Form is invalid: button is disabled
    expect(informEl.querySelector('[type="submit"]').disabled).toBe(true);

    // Set no-error-disable
    informEl.setAttribute('no-error-disable', '');
    expect(informEl.querySelector('[type="submit"]').disabled).toBe(false);


    // Attribute initially set
    informEl = await setDOM(`
        <inform-el no-error-disable>
            <form>
                <input type="text" name="some-name" required/>
                <button type="submit">Submit</button>
            </form>
        </inform-el>
    `);

    // Form is invalid but button is enabled
    expect(informEl.classList.contains('invalid')).toBe(true);
    expect(informEl.querySelector('[type="submit"]').disabled).toBe(false);

    // Remove no-error-disable => the button should be disabled
    informEl.removeAttribute('no-error-disable');
    expect(informEl.querySelector('[type="submit"]').disabled).toBe(true);

    // Make the form valid => the button should be enabled
    type(informEl.querySelector('[name="some-name"]'), "value1");
    expect(informEl.querySelector('[type="submit"]').disabled).toBe(false);

});


test('"touched" class is set on <inform-field> on change', async () => {
    const informEl = await setDOM(`
        <inform-el>
            <form>
                <inform-field id="field1">
                    <input type="text" name="some-name" required/>
                </inform-field>
                <inform-field id="field2">
                    <input type="text" name="some-description" required/>
                </inform-field>
                <button type="submit">Submit</button>
            </form>
        </inform-el>
    `);

    expect(informEl.querySelector('.touched')).toBeNull();

    type(informEl.querySelector('[name="some-name"]'), "value1", true);

    expect(informEl.querySelector('#field1').classList.contains('touched')).toBe(true);
    expect(informEl.querySelector('#field2').classList.contains('touched')).toBe(false);

    type(informEl.querySelector('[name="some-description"]'), "value2", true);

    expect(informEl.querySelector('#field1').classList.contains('touched')).toBe(true);
    expect(informEl.querySelector('#field2').classList.contains('touched')).toBe(true);

    // Reset the form: classes should be removed
    informEl.querySelector('form').reset();
    expect(informEl.querySelector('.touched')).toBeNull();

});

test('Error is set on <inform-field>', async () => {
    const informEl = await setDOM(`
        <inform-el>
            <form>
            <inform-field >
                <input type="text" name="some-name" required/>
            </inform-field>
            <button type="submit">Submit</button>
            </form>
        </inform-el>
    `);

    const input = informEl.querySelector('[name="some-name"]');
    const informField = informEl.querySelector('inform-field');

    expect(informField.getAttribute('error')).toEqual(input.validationMessage);

    // Set a value => no more error
    type(input, 'value1');
    expect(informField.getAttribute('error')).toEqual('');

});

test('Error is shown only when touched', async () => {
    const informEl = await setDOM(`
         <inform-el no-error-disable>
            <form>
                <inform-field >
                    <input type="text" name="some-name" required minlength="3"/>
                </inform-field>
                <button type="submit">Submit</button>
            </form>
        </inform-el>
    `);

    const input = informEl.querySelector('[name="some-name"]');
    const informField = informEl.querySelector('inform-field');

    expect(isElementVisible(informField.shadowRoot.getRootNode().querySelector('[role="alert"]'))).toBe(false);
    type(input, 'va', true); // Value too short (min-length=3)

    await tick();

    expect(isElementVisible(informField.shadowRoot.getRootNode().querySelector('[role="alert"]'))).toBe(true);



    // console.log('field', informField.shadowRoot.getRootNode().querySelector('[role="alert"]').outerHTML);
    // // const submitButton = informEl.querySelector('[type="submit"]');
    // // submitButton.click();
    // type(input, 'value1');
    // type(input, '');
    // await tick();
});
