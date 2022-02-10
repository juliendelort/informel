import { fixture, expect, elementUpdated, nextFrame } from '@open-wc/testing';
import { type, randomString, clear } from './test-utils';
import '../public/build/bundle.js';
import { sendKeys } from '@web/test-runner-commands';


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


        await type(informEl.querySelector('[name="some-name"]'), "value1");

        // Still invalid
        expect(informEl).to.have.class('invalid');
        expect(informEl.querySelector('[type="submit"]')).to.have.attr('disabled');


        await type(informEl.querySelector('[name="some-description"]'), "value2");

        // Valid now
        expect(informEl).not.to.have.class('invalid');
        expect(informEl.querySelector('[type="submit"]')).not.to.have.attr('disabled');


        // Remove value => invalid
        await clear(informEl.querySelector('[name="some-description"]'));
        expect(informEl).to.have.class('invalid');
        expect(informEl.querySelector('[type="submit"]')).to.have.attr('disabled');

    });

    describe('handles no-error-disable', () => {

        it('works with attribute not set initially', async () => {
            // Attribute not set initially
            const informEl = await fixture(`
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


        });

        it('works with attribute initially set', async () => {
            // Attribute initially set
            const informEl = await fixture(`
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
            await type(informEl.querySelector('[name="some-name"]'), "something");

            // await type(informEl.querySelector('[name="some-name"]'), "v");
            expect(informEl.querySelector('[type="submit"]')).not.to.have.attr('disabled');

        });

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

        await type(informEl.querySelector('[name="some-name"]'), "value1", true);

        expect(informEl.querySelector('#field1')).to.have.attr('touched');
        expect(informEl.querySelector('#field2')).not.to.have.attr('touched');

        await type(informEl.querySelector('[name="some-description"]'), "value2", true);

        expect(informEl.querySelector('#field1')).to.have.attr('touched');
        expect(informEl.querySelector('#field2')).to.have.attr('touched');

        // Reset the form: classes should be removed
        informEl.querySelector('form').reset();
        expect(informEl.querySelector('[touched]')).not.to.exist;

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

    it('shows the proper error', async () => {
        // validation handler first, then validity attribute, then "error-message" attribute, then native validation message
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field type-mismatch="Type mismatch!" default-error="This field is invalid!" >
                            <input type="email" name="some-name" required/>
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);
        const informField = informEl.querySelector('inform-field');
        const input = informEl.querySelector('[name="some-name"]');

        informEl.validationHandler = ({ values }) => {
            const result = {};
            if (values['some-name'] === 'ab') {
                result['some-name'] = 'my custom error message';
            }
            return result;
        };

        // Not in format email
        await type(input, 'a', true);
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text('Type mismatch!');

        // Custom error
        await clear(input);
        await type(input, 'ab');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text('my custom error message');

        // General error
        await clear(input);
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text('This field is invalid!');

        // Remove default-error => default to validation 
        informField.removeAttribute('default-error');

        await type(input, 'a');
        await clear(input);
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.have.rendered.text('This field is invalid!');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text(input.validationMessage);

        // Valid
        await type(input, 'some@else');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;

    });

    it('shows the proper error in the slot', async () => {
        // validation handler first, then validity attribute, then "error-message" attribute, then native validation message
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field type-mismatch="Type mismatch!" default-error="This field is invalid!" >
                            <input type="email" name="some-name" required/>
                            <span slot="error" id="error-slot"/>
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);
        const informField = informEl.querySelector('inform-field');
        const input = informEl.querySelector('[name="some-name"]');
        const errorSlot = informEl.querySelector('#error-slot');

        informEl.validationHandler = ({ values }) => {
            const result = {};
            if (values['some-name'] === 'ab') {
                result['some-name'] = 'my custom error message';
            }
            return result;
        };

        // Not in format email
        await type(input, 'a', true);
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;
        expect(errorSlot).to.have.rendered.text('Type mismatch!');

        // Custom error
        await clear(input);
        await type(input, 'ab');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;
        expect(errorSlot).to.have.rendered.text('my custom error message');

        // General error
        await clear(input);
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;
        expect(errorSlot).to.have.rendered.text('This field is invalid!');

        // Remove default-error => default to validation 
        informField.removeAttribute('default-error');
        await type(input, 'a');
        await clear(input);
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;
        expect(errorSlot).not.to.have.rendered.text('This field is invalid!');
        expect(errorSlot).to.have.rendered.text(input.validationMessage);

        // Valid
        await type(input, 'some@else');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;
        expect(errorSlot).to.have.rendered.text('');
    });

    it('triggers the submit event with the form values if the form is valid', async () => {
        let receivedEventDetails = null;
        const informEl = await fixture(`
                <inform-el no-error-disable>
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
        expect(submitButton).not.to.have.attribute('disabled'); //no-error-disable

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

    it('triggers the change and input events with the form values', async () => {
        let changeEventDetails = null;
        let inputEventDetails = null;
        const informEl = await fixture(`
                <inform-el no-error-disable>
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
        expect(submitButton).not.to.have.attribute('disabled'); //no-error-disable

        informEl.addEventListener('change', ({ detail }) => {
            changeEventDetails = detail;
        });

        informEl.addEventListener('input', ({ detail }) => {
            inputEventDetails = detail;
        });

        await type(input, 'something', false); // Only input
        await nextFrame();

        expect(inputEventDetails).to.eql({ values: { 'some-name': 'something' } });
        expect(changeEventDetails).to.be.null;

        inputEventDetails = null; // reset
        await clear(input);
        await type(input, 'something else', true); // Both input and change
        await nextFrame();

        expect(inputEventDetails).to.eql({ values: { 'some-name': 'something else' } });
        expect(changeEventDetails).to.eql({ values: { 'some-name': 'something else' } });
    });

    it('handles slot change', async () => {

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
            const setValue = async (informEl, val) => {
                await clear(informEl.querySelector('#control'));
                if (val) {
                    await type(informEl.querySelector('#control'), val, true);
                }
            };
            const generateValue = () => randomString();

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
                    setValue,
                    generateValue

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
                    setValue,
                    generateValue
                });
            });
        });

        describe('with checkbox field', () => {
            const setValue = (informEl, val) => {
                const checkbox = informEl.querySelector('#control');
                if (checkbox.checked !== val) {
                    checkbox.click();
                }
            };
            const generateValue = (initialValue) => !initialValue;
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
                    setValue,
                    generateValue
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
                    setValue,
                    generateValue
                });
            });
        });

        describe('with radio field', () => {
            const setValue = (informEl, val) => {
                if (val === "") {
                    // Just uncheck all the radio buttons
                    informEl.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
                    // Send the input+change event on the first one to trigger dirtycheck
                    informEl.querySelector('input[type="radio"]').dispatchEvent(new Event('input', { bubbles: true }));
                    informEl.querySelector('input[type="radio"]').dispatchEvent(new Event('change', { bubbles: true }));

                } else {
                    informEl.querySelector(`[value="${val}"]`).click();

                }
            };
            const generateValue = (initialValue) => initialValue === "val1" ? "val2" : "val1";
            describe('with a initial value', () => {

                runTests({
                    html: `
                        <inform-el>
                            <form>
                                <inform-field>
                                    <input  type="radio" name="field" value="val1" checked/>
                                    <input  type="radio" name="field" value="val2"/>
                                </inform-field>
                                <button type="submit">Submit</button>
                            </form>
                        </inform-el>
                    `,
                    initialValue: "val1",
                    setValue,
                    generateValue
                });
            });

            describe('without a initial value', () => {

                runTests({
                    html: `
                        <inform-el>
                            <form>
                                <inform-field>
                                    <input type="radio" name="field" value="val1" />
                                    <input type="radio" name="field" value="val2" />
                                </inform-field>
                                <button type="submit">Submit</button>
                            </form>
                        </inform-el>
                    `,
                    initialValue: "",
                    setValue,
                    generateValue
                });
            });
        });

        describe('with select field', () => {
            const setValue = async (informEl, val) => {
                informEl.querySelector('#control').focus();

                await sendKeys({
                    press: 'Space'
                });

                informEl.querySelector(`[value="${val}"]`).click();
            };
            const generateValue = (initialValue) => initialValue === "val1" ? "val2" : "val1";

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
                    setValue,
                    generateValue
                });
            });

        });

        describe('without a <inform-field> wrapper', () => {

        });

        let informEl;
        let control;
        let informField;
        let form;
        function expectDirty(expectedValue) {
            expect(informEl.dirty).to.equal(true);
            expect(informEl.values).to.eql({ field: expectedValue });
            expect(informEl).to.have.class('dirty');
            expect(informField).to.have.class('dirty');
        }

        function expectNotDirty(expectedValue) {
            expect(informEl.dirty).to.equal(false);
            expect(informEl.values).to.eql({ field: expectedValue });
            expect(informEl).not.to.have.class('dirty');
            expect(informField).not.to.have.class('dirty');
        }

        function runTests({ html, initialValue, setValue, generateValue }) {
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
                await setValue(informEl, newValue);

                expectDirty(newValue);
            }

            it('sets the dirty flags when changed', async () => {
                await setDirtyAndCheck();

            });

            it('resets the dirty flags when back to the initial value', async () => {
                await setDirtyAndCheck();

                // Now back to initial value
                await setValue(informEl, initialValue);

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
                await setValue(informEl, newValue);

                expectDirty(newValue);

                // Now back to previous reset value
                await setValue(informEl, resetValue);

                expectNotDirty(resetValue);
            });
        }

    });


});
