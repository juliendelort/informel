import { fixture, expect, elementUpdated } from '@open-wc/testing';


import '../public/build/bundle.js';

const type = (input, text, blur) => {
    input.value = text;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    if (blur) {
        input.dispatchEvent(new Event('change', { bubbles: true }));
    }

};

describe('<inform-el', () => {
    it('sets the form to novalidate', async () => {
        const informEl = await fixture(`
            <inform-el>
                <form>
                    <input type="text" name="some-name" />
                    <button type="submit">Submit</button>
                </form>
            </inform-el>
        `);

        expect(informEl.querySelector('form[novalidate]')).to.exist;

        // Form is valid
        expect(informEl).not.to.have.class('invalid');
        expect(informEl.querySelector('[type="submit"]')).not.to.have.attr('disabled');
    });


    it('"invalid" class is set when form is invalid', async () => {
        const informEl = await fixture(`
            <inform-el>
                <form>
                    <input type="text" name="some-name" required/>
                    <input type="text" name="some-description" required/>
                    <button type="submit">Submit</button>
                </form>
            </inform-el>
        `);

        // Form is invalid and submit button is disabled
        expect(informEl).to.have.class('invalid');
        expect(informEl.querySelector('[type="submit"]')).to.have.attr('disabled');


        type(informEl.querySelector('[name="some-name"]'), "value1");

        // Still invalid
        expect(informEl).to.have.class('invalid');
        expect(informEl.querySelector('[type="submit"]')).to.have.attr('disabled');


        type(informEl.querySelector('[name="some-description"]'), "value2");

        // Valid now
        expect(informEl).not.to.have.class('invalid');
        expect(informEl.querySelector('[type="submit"]')).not.to.have.attr('disabled');


        // Remove value => invalid
        type(informEl.querySelector('[name="some-description"]'), "");
        expect(informEl).to.have.class('invalid');
        expect(informEl.querySelector('[type="submit"]')).to.have.attr('disabled');

    });

    it('handles no-error-disable', async () => {
        // Attribute not set initially
        let informEl = await fixture(`
            <inform-el>
                <form>
                    <input type="text" name="some-name" required/>
                    <button type="submit">Submit</button>
                </form>
            </inform-el>
        `);

        // Form is invalid: button is disabled
        expect(informEl.querySelector('[type="submit"]')).to.have.attr('disabled');

        // Set no-error-disable
        informEl.setAttribute('no-error-disable', '');
        expect(informEl.querySelector('[type="submit"]')).not.to.have.attr('disabled');


        // Attribute initially set
        informEl = await fixture(`
            <inform-el no-error-disable>
                <form>
                    <input type="text" name="some-name" required/>
                    <button type="submit">Submit</button>
                </form>
            </inform-el>
        `);

        // Form is invalid but button is enabled
        expect(informEl).to.have.class('invalid');
        expect(informEl.querySelector('[type="submit"]')).not.to.have.attr('disabled');


        // Remove no-error-disable => the button should be disabled
        informEl.removeAttribute('no-error-disable');
        expect(informEl.querySelector('[type="submit"]')).to.have.attr('disabled');


        // Make the form valid => the button should be enabled
        type(informEl.querySelector('[name="some-name"]'), "value1");
        expect(informEl.querySelector('[type="submit"]')).not.to.have.attr('disabled');


    });

    it('sets the "touched" attribute on <inform-field> on change', async () => {
        const informEl = await fixture(`
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

        expect(informEl.querySelector('[touched]')).not.to.exist;

        type(informEl.querySelector('[name="some-name"]'), "value1", true);

        expect(informEl.querySelector('#field1')).to.have.attr('touched');
        expect(informEl.querySelector('#field2')).not.to.have.attr('touched');

        type(informEl.querySelector('[name="some-description"]'), "value2", true);

        expect(informEl.querySelector('#field1')).to.have.attr('touched');
        expect(informEl.querySelector('#field2')).to.have.attr('touched');

        // Reset the form: classes should be removed
        informEl.querySelector('form').reset();
        expect(informEl.querySelector('[touched]')).not.to.exist;

    });

    it('sets the error on  <inform-field>', async () => {
        const informEl = await fixture(`
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

        expect(informField).to.have.attribute('error', input.validationMessage);

        // Set a value => no more error
        type(input, 'value1');
        expect(informField).not.to.have.attribute('error');


    });


    it('only shows the error when touched', async () => {
        const informEl = await fixture(`
            <inform-el no-error-disable style="display: none;">
                 <form>
                    <inform-field >
                        <input type="text" name="some-name" pattern="^.{20,}$"/>
                     </inform-field>
                     <button type="submit">Submit</button>
                 </form>
             </inform-el>
    `);
        const input = informEl.querySelector('[name="some-name"]');
        const informField = informEl.querySelector('inform-field');


        // console.log('span', informField.shadowRoot.getRootNode().querySelector('[role="alert"]')?.outerHTML);
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;

        type(input, 'va'); // Value too short (pattern minlength = 20)

        // Element hasn't been blurred yet (no change event, only input), so error is not present
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;

        input.dispatchEvent(new Event('change', { bubbles: true }));

        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
    });

    it('shows the error slot', async () => {
        const informEl = await fixture(`
                <inform-el no-error-disable style="display: none;">
                    <form>
                        <inform-field >
                            <input type="text" name="some-name" pattern="^.{20,}$"/>
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);
        const input = informEl.querySelector('[name="some-name"]');
        const informField = informEl.querySelector('inform-field');

        type(input, 'va', true); // Value too short (pattern minlength = 20)

        // Renders the default error span
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;

        // Add a slot
        const errorSlot = document.createElement('span');
        errorSlot.id = "my-error-slot";
        errorSlot.setAttribute('slot', "error");

        informField.appendChild(errorSlot);

        await elementUpdated(informField);

        // Now the default error is not present
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;

        // ...And the slot has the error
        expect(errorSlot.textContent).to.equal(input.validationMessage);

        // Remove the slot
        errorSlot.parentNode.remove(errorSlot);
        await elementUpdated(informField);

        // ...The default error is back
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;



        // TODO: test when slot is present from the beginning

    });


});
