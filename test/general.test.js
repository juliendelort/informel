import { fixture, expect, nextFrame } from '@open-wc/testing';
import {
    type,
    eventCheck,
    clear
} from './test-utils';
import '../public/build/bundle.js';

describe('general tests', () => {
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
        expect(informEl).not.to.have.attribute('invalid');
        expect(informEl.querySelector('[type="submit"]')).not.to.have.attr('disabled');
    });

    it('sets the error on <inform-field>', async () => {
        const informEl = await fixture(`
            <inform-el>
                <form>
                <inform-field >
                    <input type="text" name="some-name" required pattern="^ab$"/>
                </inform-field>
                <button type="submit">Submit</button>
                </form>
            </inform-el>
        `);

        const input = informEl.querySelector('[name="some-name"]');
        const informField = informEl.querySelector('inform-field');

        // Only set error when touched
        expect(informField).not.to.have.attribute('error');
        expect(informField).to.have.attribute('error-message', input.validationMessage);

        await type(input, 'a', true); // touched but still in error
        expect(informField).to.have.attribute('error');
        expect(informField).to.have.attribute('error-message', input.validationMessage);

        // no more error
        await type(input, 'b', true);
        expect(informField).not.to.have.attribute('error');
        expect(informField).not.to.have.attribute('error-message');
    });

    it('only shows the error when touched', async () => {
        const informEl = await fixture(`
            <inform-el>
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


        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;

        await type(input, 'va'); // Value too short (pattern minlength = 20)

        // Element hasn't been blurred yet (no change event, only input), so error is not present
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;

        input.dispatchEvent(new Event('change', { bubbles: true }));

        // After blur, the error should be visible
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text(input.validationMessage);


        // Fix the error => no more error
        await type(input, 'a'.repeat(20));

        // No more error 
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;
        expect(informField).not.to.have.attribute('error-message');


    });

    it('handles slot change', async () => {
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field>
                            <input type="text" name="form1field" />
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);

        // now change the form
        const newForm = document.createElement('form');
        newForm.innerHTML = `
            <inform-field default-error="test error">
                <input type="text" name="form2field" pattern="^.{20,}$"/>
            </inform-field>
            <button type="submit">Submit</button>
        `;

        const oldForm = informEl.querySelector('form');
        oldForm.parentElement.removeChild(oldForm);

        informEl.appendChild(newForm);

        await nextFrame();

        // New form received the novalidate attribute
        expect(newForm).to.have.attribute('novalidate');

        // We are listening to events on the new form
        const newInput = informEl.querySelector('[name="form2field"]');

        const [changeCalled, changeDetails] = eventCheck(informEl, 'inform-change');

        await type(newInput, 'hello', true);
        await nextFrame();


        expect(changeCalled()).to.be.true;
        expect(changeDetails()).to.eql({ values: { form2field: 'hello' }, changedField: 'form2field' });

        // Errors are displayed (pattern)
        expect(informEl).to.have.attribute('invalid');
        const informField = informEl.querySelector('inform-field');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text('test error');

    });

    it('handles fields that are added or removed', async () => {
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field>
                            <input type="text" name="field1" value="initial" />
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);

        expect(informEl.values).to.deep.equal({ field1: "initial" });

        const input = document.createElement('input');
        input.type = "text";
        input.name = "users.0.name.first";

        informEl.querySelector('form').appendChild(input);

        await nextFrame();
        expect(informEl.values).to.deep.equal({ field1: "initial", users: [{ name: { first: "" } }] });

        const select = document.createElement('select');
        select.name = "users.0.country";

        ['usa', 'canada', 'france'].forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            select.appendChild(option);
        });

        select.value = "france";

        informEl.querySelector('form').appendChild(select);
        await nextFrame();

        expect(informEl.values).to.deep.equal({ field1: "initial", users: [{ name: { first: "" }, country: "france" }] });

        input.parentElement.removeChild(input);
        await nextFrame();

        expect(informEl.values).to.deep.equal({ field1: "initial", users: [{ country: "france" }] });
    });

    it('assigns matching extra values when fiels are added', async () => {
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field>
                            <input type="text" name="field1" value="initial" />
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);

        expect(informEl.values).to.deep.equal({ field1: "initial" });

        informEl.setValues({
            field1: "changed",
            users: [{ name: { first: 'some name' } }]
        });

        await nextFrame();
        expect(informEl.values).to.deep.equal({
            field1: "changed",
            users: [{ name: { first: 'some name' } }]
        });

        const input = document.createElement('input');
        input.type = "text";
        input.name = "users.0.name.first";

        informEl.querySelector('form').appendChild(input);

        await nextFrame();

        expect(input).to.have.value('some name');
        expect(informEl.values).to.deep.equal({
            field1: "changed",
            users: [{ name: { first: 'some name' } }]
        });

        const field1 = informEl.querySelector('[name="field1"]');

        field1.parentElement.removeChild(field1);
        await nextFrame();

        expect(informEl.values).to.deep.equal({ users: [{ name: { first: 'some name' } }] });

        input.parentElement.removeChild(input);
        await nextFrame();

        expect(informEl.values).to.deep.equal({});


    });

    it('keeps the current fields when resetting', async () => {
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field>
                            <input type="text" name="field1" value="initial" />
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);

        expect(informEl.values).to.deep.equal({ field1: "initial" });

        // reset with some extra values
        informEl.reset({ extraVal: 'initialExtraVal' });

        await nextFrame();

        expect(informEl.values).to.deep.equal({ field1: "initial", extraVal: "initialExtraVal" });

        // then change them
        informEl.setValues({ extraVal: 'changedExtraVal' });

        const input = document.createElement('input');
        input.type = "text";
        input.name = "users.0.name.first";
        input.value = "some name";

        informEl.querySelector('form').appendChild(input);

        await nextFrame();

        expect(input.value).to.equal('some name');
        expect(informEl.values).to.deep.equal({
            field1: "initial",
            users: [{ name: { first: 'some name' } }],
            extraVal: 'changedExtraVal'
        });

        const existingField = informEl.querySelector('[name="field1"]');
        existingField.parentElement.removeChild(existingField);

        await nextFrame();

        expect(informEl.values).to.deep.equal({ users: [{ name: { first: 'some name' } }], extraVal: 'changedExtraVal' });

        informEl.reset({ otherExtraVal: 'otherExtraValValue' });
        await nextFrame();

        expect(informEl.values).to.deep.equal({ users: [{ name: { first: '' } }], extraVal: 'initialExtraVal', otherExtraVal: 'otherExtraValValue' });
        expect(input).to.have.value('');

    });

    it('emits informel-ready event when ready', async () => {
        const container = await fixture(`
            <div></div>
        `);

        const [readyHasBeenCalled] = eventCheck(container, 'informel-ready');
        container.innerHTML = `
            <inform-el>
                <form>
                    <inform-field>
                        <input type="text" name="form1field" />
                    </inform-field>
                    <button type="submit">Submit</button>
                </form>
            </inform-el>
        `;

        await nextFrame();
        expect(readyHasBeenCalled()).to.be.true;
    });

    // it('removes empty values', async () => {
    //     const informEl = await fixture(`
    //             <inform-el>
    //                 <form>
    //                     <inform-field>
    //                         <input type="text" name="field" />
    //                     </inform-field>
    //                     <button type="submit">Submit</button>
    //                 </form>
    //             </inform-el>
    //     `);

    //     const input = informEl.querySelector('input');
    //     expect(informEl.values).to.eql({});

    //     await type(input, 'non empty value');


    //     expect(informel.values).to.eql({ field: 'non empty value' });

    //     await clear(input);

    //     expect(informel.values).to.eql({});


    // });
});
