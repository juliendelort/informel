import { fixture, expect, elementUpdated, nextFrame } from '@open-wc/testing';
import {
    type,
    clear,
    generateTextInputValue,
    setTextInputValue,
    setCheckboxValue,
    generateCheckboxValue,
    setRadioValue,
    generateRadioValue,
    setSelectValue,
    generateSelectValue,
    eventCheck
} from './test-utils';
import '../public/build/bundle.js';


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


    describe('"invalid" class is set when form is invalid', () => {

        it('works with text input', async () => {
            await runTests({
                html: `
                    <inform-el>
                        <form>
                            <input id="control1" type="text" name="some-name" required/>
                            <input id="control2" type="text" name="some-description" required/>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
                setValue: setTextInputValue,
                validValue: generateTextInputValue(),
                invalidValue: ''
            });
        });

        it('works with checkboxes', async () => {
            await runTests({
                html: `
                    <inform-el>
                        <form>
                            <input id="control1" type="checkbox" name="some-name" required/>
                            <input id="control2" type="checkbox" name="some-description" required/>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
                setValue: setCheckboxValue,
                validValue: true,
                invalidValue: false
            });
        });

        it('works with select', async () => {
            await runTests({
                html: `
                    <inform-el>
                        <form>
                            <select id="control1" name="field" required>
                                <option value="">--Please choose an option--</option>
                                <option value="val1">Value1</option>
                                <option value="val2">Value2</option>
                                <option value="val3">Value3</option>
                            </select>
                             <select id="control2" name="field" required>
                                <option value="">--Please choose an option--</option>
                                <option value="val1">Value1</option>
                                <option value="val2">Value2</option>
                                <option value="val3">Value3</option>
                            </select>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
                setValue: setSelectValue,
                validValue: 'val2',
                invalidValue: ''
            });
        });

        async function runTests({ html, setValue, validValue, invalidValue }) {
            const informEl = await fixture(html);
            const control1 = informEl.querySelector('#control1');
            const control2 = informEl.querySelector('#control2');

            // Form is invalid and submit button is disabled
            expect(informEl).to.have.class('invalid');

            await setValue(control1, validValue);

            // Still invalid
            expect(informEl).to.have.class('invalid');


            await setValue(control2, validValue);


            // Valid now
            expect(informEl).not.to.have.class('invalid');


            // Remove value => invalid
            await setValue(control2, invalidValue);
            expect(informEl).to.have.class('invalid');
        }

    });

    describe('handles error-disable-submit', () => {

        describe('with text input', () => {
            runTests({
                html: `
                        <form>
                            <input id="control" type="text" name="some-name" required/>
                            <button type="submit">Submit</button>
                        </form>
                `,

                setValue: setTextInputValue,
                validValue: generateTextInputValue(),
                invalidValue: ''
            });

        });

        describe('with checbox', () => {
            runTests({
                html: `
                        <form>
                            <input id="control" type="checkbox" name="some-name" required/>
                            <button type="submit">Submit</button>
                        </form>
                `,

                setValue: setCheckboxValue,
                validValue: true,
                invalidValue: false
            });

        });

        describe('with select', async () => {
            await runTests({
                html: `
                        <form>
                            <select id="control" name="field" required>
                                <option value="">--Please choose an option--</option>
                                <option value="val1">Value1</option>
                                <option value="val2">Value2</option>
                                <option value="val3">Value3</option>
                            </select>
                            <button type="submit">Submit</button>
                        </form>
                `,
                setValue: setSelectValue,
                validValue: 'val2',
                invalidValue: ''
            });
        });

        async function runTests({ html, setValue, validValue, invalidValue }) {
            it('works with attribute not set initially', async () => {
                // Attribute not set initially
                const informEl = await fixture(`
                    <inform-el>
                        ${html}
                    </inform-el>
                `);

                // Form is invalid but button is not disabled
                expect(informEl.querySelector('[type="submit"]')).not.to.have.attr('disabled');

                // Set error-disable-submit
                informEl.setAttribute('error-disable-submit', '');
                expect(informEl.querySelector('[type="submit"]')).to.have.attr('disabled');
            });

            it('works with attribute initially set', async () => {
                // Attribute initially set
                const informEl = await fixture(`
                    <inform-el error-disable-submit>
                        ${html}
                    </inform-el>
                `);

                const control = informEl.querySelector('#control');


                // Form is invalid and button is disabled
                expect(informEl).to.have.class('invalid');
                expect(informEl.querySelector('[type="submit"]')).to.have.attr('disabled');

                // Make the form valid => the button should be enabled
                await setValue(control, validValue);

                // await type(informEl.querySelector('[name="some-name"]'), "v");
                expect(informEl.querySelector('[type="submit"]')).not.to.have.attr('disabled');


                // Make the form invalid again
                await setValue(control, invalidValue);
                expect(informEl.querySelector('[type="submit"]')).to.have.attr('disabled');


                // Remove error-disable-submit => the button should be enabled
                informEl.removeAttribute('error-disable-submit');
                expect(informEl.querySelector('[type="submit"]')).not.to.have.attr('disabled');

            });

        }

    });

    describe('sets the "touched" attribute on <inform-field> on change', () => {

        it('works with text input', async () => {
            await runTests({
                html: `
                    <inform-el>
                        <form>
                            <inform-field id="field1">
                                <input class="control1" type="text" name="some-name" required/>
                            </inform-field>
                            <inform-field id="field2">
                                <input class="control2" type="text" name="some-description" required/>
                            </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
                setValue: setTextInputValue,
                generateValue: generateTextInputValue
            });
        });

        it('works with checkbox', async () => {
            await runTests({
                html: `
                    <inform-el>
                        <form>
                            <inform-field id="field1">
                                <input class="control1" type="checkbox" name="some-name" required/>
                            </inform-field>
                            <inform-field id="field2">
                                <input class="control2" type="checkbox" name="some-description" required/>
                            </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
                setValue: setCheckboxValue,
                generateValue: generateCheckboxValue
            });
        });

        it('works with radio buttons', async () => {
            await runTests({
                html: `
                    <inform-el>
                        <form>
                            <inform-field id="field1"  class="control1">
                                <input type="radio" name="field" value="val1" />
                                <input type="radio" name="field" value="val2" />
                            </inform-field>
                            <inform-field id="field2"  class="control2">
                                <input type="radio" name="field" value="val1" />
                                <input type="radio" name="field" value="val2" />
                            </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
                setValue: setRadioValue,
                generateValue: generateRadioValue
            });
        });

        it('works with select', async () => {
            await runTests({
                html: `
                    <inform-el>
                        <form>
                            <inform-field id="field1" >
                                <select class="control1" name="field" required>
                                    <option value="">--Please choose an option--</option>
                                    <option value="val1">Value1</option>
                                    <option value="val2">Value2</option>
                                    <option value="val3">Value3</option>
                                </select>
                            </inform-field>
                            <inform-field id="field2">
                                <select class="control2" name="field" required>
                                    <option value="">--Please choose an option--</option>
                                    <option value="val1">Value1</option>
                                    <option value="val2">Value2</option>
                                    <option value="val3">Value3</option>
                                </select>
                            </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
                setValue: setSelectValue,
                generateValue: generateSelectValue
            });
        });

        async function runTests({ html, setValue, generateValue }) {
            const informEl = await fixture(html);
            const control1 = informEl.querySelector('.control1');
            const control2 = informEl.querySelector('.control2');

            expect(informEl.querySelector('[touched]')).not.to.exist;

            await setValue(control1, generateValue());

            expect(informEl.querySelector('#field1')).to.have.attr('touched');
            expect(informEl.querySelector('#field2')).not.to.have.attr('touched');

            await setValue(control2, generateValue());

            expect(informEl.querySelector('#field1')).to.have.attr('touched');
            expect(informEl.querySelector('#field2')).to.have.attr('touched');

            // Reset the form: classes should be removed
            informEl.querySelector('form').reset();
            expect(informEl.querySelector('[touched]')).not.to.exist;
        }

    });


    it('sets the error on <inform-field>', async () => {
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
        await type(input, 'value1');
        expect(informField).not.to.have.attribute('error');
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
        expect(informField).not.to.have.attribute('error');


    });

    it('shows the error slot', async () => {
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field >
                            <input type="text" name="some-name" pattern="^.{20,}$"/>
                            <span slot="error" id="the-error-slot"></span>
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);

        const input = informEl.querySelector('[name="some-name"]');
        const informField = informEl.querySelector('inform-field');
        const errorSlot = informEl.querySelector('#the-error-slot');

        await type(input, 'va', true); // Value too short (pattern minlength = 20)


        // The default error span should not exist
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;

        // ...And the slot has the error
        expect(errorSlot).to.have.rendered.text(input.validationMessage);
    });

    it('reacts to updates to the error slot', async () => {
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

        await type(input, 'va', true); // Value too short (pattern minlength = 20)

        // Renders the default error span
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text(input.validationMessage);


        // Add a slot
        const errorSlot = document.createElement('span');
        errorSlot.id = "my-error-slot";
        errorSlot.setAttribute('slot', "error");

        informField.appendChild(errorSlot);

        await elementUpdated(informField);

        // Now the default error is not present
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;

        // ...And the slot has the error
        expect(errorSlot).to.have.rendered.text(input.validationMessage);


        // Remove the slot
        informField.removeChild(errorSlot);

        await elementUpdated(informField);

        // ...The default error is back
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text(input.validationMessage);

    });

    it('considers validationHandler', async () => {
        // There should be an error on the input because of the pattern
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field>
                            <input type="text" name="some-name" pattern="^ab|ef$"/>
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);
        const form = informEl.querySelector('form');
        const informField = informEl.querySelector('inform-field');
        const input = informEl.querySelector('[name="some-name"]');

        informEl.validationHandler = ({ values }) => {
            const result = {};
            if (values['some-name'] === 'ab' || values['some-name'] === 'cd') {
                result['some-name'] = 'my custom error message';
            }
            return result;
        };

        await type(input, 'a', true); // Should be native only
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField).to.have.attribute('error', input.validationMessage);
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text(input.validationMessage);

        expect(input.validity.customError).to.equal(false);
        expect(input.validity.patternMismatch).to.equal(true);

        await clear(input);
        await type(input, 'ab'); // Should be a custom error only
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField).to.have.attribute('error', 'my custom error message');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text('my custom error message');
        expect(form.checkValidity()).to.equal(false);
        expect(informEl).to.have.class('invalid');

        await clear(input);
        await type(input, 'cd'); // Should be both => still renders the custom one
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField).to.have.attribute('error', 'my custom error message');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text('my custom error message');

        await clear(input);
        await type(input, 'ef'); // Should be no error
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;
        expect(informField).not.to.have.attribute('error');
        expect(form.checkValidity()).to.equal(true);
        expect(informEl).not.to.have.class('invalid');


    });

    describe('shows the proper error', async () => {

        it('renders inline if no slot', async () => {
            await runTests({
                html: `
                    <inform-el>
                        <form>
                            <inform-field type-mismatch="Type mismatch!" default-error="This field is invalid!" >
                                <input type="email" name="some-name" required/>
                            </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
                getErrorContainer: (informField) => informField.shadowRoot.getRootNode().querySelector('[role="alert"]'),
                getNativeContainer: (informField) => informField.shadowRoot.getRootNode().querySelector('[role="alert"]'),
                slot: false

            });
        });

        it('renders in the slot', async () => {
            await runTests({
                html: `
                     <inform-el>
                        <form>
                            <inform-field type-mismatch="Type mismatch!" default-error="This field is invalid!" >
                                <input type="email" name="some-name" required/>
                                <span slot="error" id="error-slot"/>
                            </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
                getErrorContainer: (informField) => informField.querySelector('#error-slot'),
                getNativeContainer: (informField) => informField.shadowRoot.getRootNode().querySelector('[role="alert"]'),
                slot: true

            });
        });

        async function runTests({ html, getErrorContainer, getNativeContainer, slot }) {
            // validation handler first, then validity attribute, then "error-message" attribute, then native validation message
            const informEl = await fixture(html);
            const informField = informEl.querySelector('inform-field');
            const input = informEl.querySelector('[name="some-name"]');

            informEl.validationHandler = ({ values }) => {
                const result = {};
                if (values['some-name'] === 'ab') {
                    result['some-name'] = 'my custom error message';
                }
                return result;
            };

            informEl.validationHandler = ({ values }) => {
                const result = {};
                if (values['some-name'] === 'ab') {
                    result['some-name'] = 'my custom error message';
                }
                return result;
            };

            // Not in format email
            await type(input, 'a', true);
            if (slot) {
                expect(getNativeContainer(informField)).not.to.exist;
            }
            expect(getErrorContainer(informField)).to.have.rendered.text('Type mismatch!');

            // Custom error
            await clear(input);
            await type(input, 'ab');
            if (slot) {
                expect(getNativeContainer(informField)).not.to.exist;
            }
            expect(getErrorContainer(informField)).to.have.rendered.text('my custom error message');

            // General error
            await clear(input);
            if (slot) {
                expect(getNativeContainer(informField)).not.to.exist;
            }
            expect(getErrorContainer(informField)).to.have.rendered.text('This field is invalid!');

            // Remove default-error => default to validation 
            informField.removeAttribute('default-error');
            await type(input, 'a');
            await clear(input);
            if (slot) {
                expect(getNativeContainer(informField)).not.to.exist;
            }
            expect(getErrorContainer(informField)).not.to.have.rendered.text('This field is invalid!');
            expect(getErrorContainer(informField)).to.have.rendered.text(input.validationMessage);

            // Valid
            await type(input, 'some@else');
            expect(getNativeContainer(informField)).not.to.exist;
            if (slot) {
                expect(getErrorContainer(informField)).to.have.rendered.text('');
            }

        }

    });



    describe('input and change events', () => {

        it('works with text input', async () => {
            await runTests({
                html: `
                    <inform-el>
                        <form>
                            <inform-field>
                                <input id="control" type="text" name="some-name"/>
                            </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
                setValue: setTextInputValue,
                generateValue: generateTextInputValue,
                text: true
            });
        });

        it('works with checkbox', async () => {
            await runTests({
                html: `
                    <inform-el>
                        <form>
                            <inform-field>
                                <input id="control" type="checkbox" name="some-name"/>
                            </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
                setValue: setCheckboxValue,
                generateValue: generateCheckboxValue,
                text: false
            });
        });

        it('works with radio button', async () => {
            await runTests({
                html: `
                    <inform-el>
                        <form>
                            <inform-field id="control">
                                <input  type="radio" name="some-name" value="val1"/>
                                <input  type="radio" name="some-name" value="val2"/>
                            </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
                setValue: setRadioValue,
                generateValue: generateRadioValue,
                text: false
            });
        });

        it('works with select', async () => {
            await runTests({
                html: `
                    <inform-el>
                        <form>
                            <inform-field>
                                <select id="control" name="some-name">
                                <option value="">--Please choose an option--</option>
                                <option value="val1">Value1</option>
                                <option value="val2">Value2</option>
                                <option value="val3">Value3</option>
                            </select>
                            </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
                setValue: setSelectValue,
                generateValue: generateSelectValue,
                text: false
            });
        });
        async function runTests({ html, setValue, generateValue, text }) {
            const informEl = await fixture(html);
            const control = informEl.querySelector('#control');

            const [, changeDetails, resetChange] = eventCheck(informEl, 'change');
            const [, inputDetails, resetInput] = eventCheck(informEl, 'input');

            if (text) {
                const input = informEl.querySelector('#control');
                await type(input, 'something', false); // Only input
                await nextFrame();
                expect(inputDetails()).to.eql({ values: { 'some-name': 'something' } });
                expect(changeDetails()).to.be.null;
                resetInput();
                resetChange();
                await clear(input);
            }

            const newValue = generateValue();
            await setValue(control, newValue); // Both input and change
            await nextFrame();

            expect(inputDetails()).to.eql({ values: { 'some-name': newValue } });
            expect(changeDetails()).to.eql({ values: { 'some-name': newValue } });
        }
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

        const [changeCalled, changeDetails] = eventCheck(informEl, 'change');

        await type(newInput, 'hello', true);

        expect(changeCalled()).to.equal(true);
        expect(changeDetails()).to.eql({ values: { form2field: 'hello' } });

        // Errors are displayed (pattern)
        expect(informEl).to.have.class('invalid');
        const informField = informEl.querySelector('inform-field');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text('test error');

    });

    it('works with checkboxes and radio buttons', async () => {

    });

    it('works with <select/>', async () => {

    });

    describe('reset', () => {
        describe('when reseting the form', () => {

            it('resets the form values', async () => {

            });

            it('removes the dirty flags', async () => {

            });

            it('removes the touched flags', async () => {

            });
        });

        describe('when resetting <inform-el>', () => {

            // Same as above +
            it('resets to the form initial values when no arguments', async () => {

            });

            it('sets new values when provided ', async () => {

            });
        });
    });

    describe('dirty check', () => {

        describe('with text field', () => {

            describe('with a initial value', () => {

                runTests({
                    html: `
                        <inform-el>
                            <form>
                                <inform-field>
                                    <input id="control" type="text" name="field" value="initial-value"/>
                                </inform-field>
                                <button type="submit">Submit</button>
                            </form>
                        </inform-el>
                    `,
                    initialValue: 'initial-value',
                    setValue: setTextInputValue,
                    generateValue: generateTextInputValue

                });
            });

            describe('with no initial value', () => {

                runTests({
                    html: `
                        <inform-el>
                            <form>
                                <inform-field>
                                    <input id="control" type="text" name="field" />
                                </inform-field>
                                <button type="submit">Submit</button>
                            </form>
                        </inform-el>
                    `,
                    initialValue: '',
                    setValue: setTextInputValue,
                    generateValue: generateTextInputValue
                });
            });
        });

        describe('with checkbox field', () => {
            describe('with a initial value', () => {

                runTests({
                    html: `
                        <inform-el>
                            <form>
                                <inform-field>
                                    <input id="control" type="checkbox" name="field" checked/>
                                </inform-field>
                                <button type="submit">Submit</button>
                            </form>
                        </inform-el>
                    `,
                    initialValue: true,
                    setValue: setCheckboxValue,
                    generateValue: generateCheckboxValue
                });
            });

            describe('with no initial value', () => {
                runTests({
                    html: `
                        <inform-el>
                            <form>
                                <inform-field>
                                    <input id="control" type="checkbox" name="field" />
                                </inform-field>
                                <button type="submit">Submit</button>
                            </form>
                        </inform-el>
                    `,
                    initialValue: false,
                    setValue: setCheckboxValue,
                    generateValue: generateCheckboxValue
                });
            });
        });

        describe('with radio field', () => {
            describe('with a initial value', () => {

                runTests({
                    html: `
                        <inform-el>
                            <form>
                                <inform-field id="control">
                                    <input  type="radio" name="field" value="val1" checked/>
                                    <input  type="radio" name="field" value="val2"/>
                                </inform-field>
                                <button type="submit">Submit</button>
                            </form>
                        </inform-el>
                    `,
                    initialValue: "val1",
                    setValue: setRadioValue,
                    generateValue: generateRadioValue
                });
            });

            describe('without a initial value', () => {

                runTests({
                    html: `
                        <inform-el>
                            <form>
                                <inform-field id="control">
                                    <input type="radio" name="field" value="val1" />
                                    <input type="radio" name="field" value="val2" />
                                </inform-field>
                                <button type="submit">Submit</button>
                            </form>
                        </inform-el>
                    `,
                    initialValue: "",
                    setValue: setRadioValue,
                    generateValue: generateRadioValue
                });
            });
        });

        describe('with select field', () => {
            describe('without a initial value', () => {

                runTests({
                    html: `
                            <inform-el>
                                <form>
                                    <inform-field>
                                        <select id="control" name="field" >
                                            <option value="">--Please choose an option--</option>
                                            <option value="val1">Value1</option>
                                            <option value="val2">Value2</option>
                                            <option value="val3">Value3</option>
                                        </select>
                                    </inform-field>
                                    <button type="submit">Submit</button>
                                </form>
                            </inform-el>
                        `,
                    initialValue: "",
                    setValue: setSelectValue,
                    generateValue: generateSelectValue
                });
            });

            describe('with a initial value', () => {

                runTests({
                    html: `
                            <inform-el>
                                <form>
                                    <inform-field>
                                        <select id="control" name="field" value="val2">
                                            <option value="">--Please choose an option--</option>
                                            <option value="val1">Value1</option>
                                            <option value="val2">Value2</option>
                                            <option value="val3">Value3</option>
                                        </select>
                                    </inform-field>
                                    <button type="submit">Submit</button>
                                </form>
                            </inform-el>
                        `,
                    initialValue: "",
                    setValue: setSelectValue,
                    generateValue: generateSelectValue
                });
            });
            describe('without a <inform-field> wrapper', () => {
                runTests({
                    html: `
                            <inform-el>
                                <form>
                                    <select id="control" name="field" value="val2">
                                        <option value="">--Please choose an option--</option>
                                        <option value="val1">Value1</option>
                                        <option value="val2">Value2</option>
                                        <option value="val3">Value3</option>
                                    </select>
                                    <button type="submit">Submit</button>
                                </form>
                            </inform-el>
                        `,
                    initialValue: "",
                    setValue: setSelectValue,
                    generateValue: generateSelectValue,
                    skipInformField: true
                });
            });

        });



        let informEl;
        let control;
        let informField;
        let form;


        function runTests({ html, initialValue, setValue, generateValue, skipInformField }) {
            function expectDirty(expectedValue) {
                expect(informEl.dirty).to.equal(true);
                expect(informEl.values).to.eql({ field: expectedValue });
                expect(informEl).to.have.class('dirty');
                if (!skipInformField) {
                    expect(informField).to.have.class('dirty');
                }
            }

            function expectNotDirty(expectedValue) {
                expect(informEl.dirty).to.equal(false);
                expect(informEl.values).to.eql({ field: expectedValue });
                expect(informEl).not.to.have.class('dirty');
                if (!skipInformField) {
                    expect(informField).not.to.have.class('dirty');
                }
            }

            beforeEach(async () => {
                informEl = await fixture(html);

                control = informEl.querySelector('#control');
                informField = informEl.querySelector('inform-field');
                form = informEl.querySelector('form');
            });

            async function setDirtyAndCheck() {
                expectNotDirty(initialValue);

                const newValue = generateValue(initialValue);

                // Change the value
                await setValue(control, newValue);

                expectDirty(newValue);
            }

            it('sets the dirty flags when changed', async () => {
                await setDirtyAndCheck();

            });

            it('resets the dirty flags when back to the initial value', async () => {
                await setDirtyAndCheck();

                // Now back to initial value
                await setValue(control, initialValue);

                expectNotDirty(initialValue);
            });

            it('resets the dirty flags when resetting with no parameter', async () => {
                await setDirtyAndCheck();

                informEl.reset();

                expectNotDirty(initialValue);

            });

            it('resets the dirty flags when resetting with new values', async () => {
                await setDirtyAndCheck();
                const newValue = generateValue(initialValue);


                informEl.reset({ field: newValue });

                expectNotDirty(newValue);
            });

            it('resets the dirty flags when resetting the form directly', async () => {
                await setDirtyAndCheck();

                form.reset();
                await elementUpdated(informEl);

                expectNotDirty(initialValue);
            });

            it('resets the dirty flags when back to previous reset values', async () => {
                await setDirtyAndCheck();

                const resetValue = generateValue(initialValue);

                informEl.reset({ field: resetValue });

                expectNotDirty(resetValue);

                const newValue = generateValue(resetValue);


                // Change the value
                await setValue(control, newValue);

                expectDirty(newValue);

                // Now back to previous reset value
                await setValue(control, resetValue);

                expectNotDirty(resetValue);
            });
        }

    });

    describe('submit', () => {
        it('triggers the submit event with the form values if the form is valid', async () => {
            let receivedEventDetails = null;
            const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field>
                            <input type="text" name="some-name" required/>
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);

            const input = informEl.querySelector('[name="some-name"]');
            const submitButton = informEl.querySelector('[type="submit"]');

            await type(input, 'a', true);
            await clear(input);

            informEl.addEventListener('submit', ({ detail }) => {
                receivedEventDetails = detail;
            });

            submitButton.click();
            await nextFrame();

            expect(receivedEventDetails).to.be.null;

            // Fix the form
            await type(input, 'something');

            submitButton.click();
            await nextFrame();
            expect(receivedEventDetails).to.eql({ values: { 'some-name': 'something' } });

        });

        it('sends FormData if any value if of type File', async () => {

        });
    });


});
