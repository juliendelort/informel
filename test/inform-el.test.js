import { fixture, expect, elementUpdated, nextFrame } from '@open-wc/testing';
import { type, setCb, randomString } from './test-utils';
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
        type(input, 'value1');
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

        type(input, 'va'); // Value too short (pattern minlength = 20)

        // Element hasn't been blurred yet (no change event, only input), so error is not present
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;

        input.dispatchEvent(new Event('change', { bubbles: true }));

        // After blur, the error should be visible
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text(input.validationMessage);


        // Fix the error => no more error
        type(input, 'a'.repeat(20));

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

        type(input, 'va', true); // Value too short (pattern minlength = 20)


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

        type(input, 'va', true); // Value too short (pattern minlength = 20)

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
        type(input, 'a', true); // Should be native only
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField).to.have.attribute('error', input.validationMessage);
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text(input.validationMessage);

        expect(input.validity.customError).to.equal(false);
        expect(input.validity.patternMismatch).to.equal(true);


        type(input, 'ab'); // Should be a custom error only
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField).to.have.attribute('error', 'my custom error message');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text('my custom error message');
        expect(form.checkValidity()).to.equal(false);
        expect(informEl).to.have.class('invalid');


        type(input, 'cd'); // Should be both => still renders the custom one
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField).to.have.attribute('error', 'my custom error message');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text('my custom error message');

        type(input, 'ef'); // Should be no error
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
        type(input, 'a', true);
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text('Type mismatch!');

        // Custom error
        type(input, 'ab');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text('my custom error message');

        // General error
        type(input, '');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text('This field is invalid!');

        // Remove default-error => default to validation 
        informField.removeAttribute('default-error');
        type(input, '');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.have.rendered.text('This field is invalid!');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text(input.validationMessage);

        // Valid
        type(input, 'some@else');
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
        type(input, 'a', true);
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;
        expect(errorSlot).to.have.rendered.text('Type mismatch!');

        // Custom error
        type(input, 'ab');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;
        expect(errorSlot).to.have.rendered.text('my custom error message');

        // General error
        type(input, '');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;
        expect(errorSlot).to.have.rendered.text('This field is invalid!');

        // Remove default-error => default to validation 
        informField.removeAttribute('default-error');
        type(input, '');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;
        expect(errorSlot).not.to.have.rendered.text('This field is invalid!');
        expect(errorSlot).to.have.rendered.text(input.validationMessage);

        // Valid
        type(input, 'some@else');
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

        type(input, '', true); // Invalid
        expect(submitButton).not.to.have.attribute('disabled'); //no-error-disable

        informEl.addEventListener('submit', ({ detail }) => {
            receivedEventDetails = detail;
        });

        submitButton.click();
        await nextFrame();

        expect(receivedEventDetails).to.be.null;

        // Fix the form
        type(input, 'something');

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

        type(input, 'something', false); // Only input
        await nextFrame();

        expect(inputEventDetails).to.eql({ values: { 'some-name': 'something' } });
        expect(changeEventDetails).to.be.null;

        inputEventDetails = null; // reset
        type(input, 'something else', true); // Both input and change
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
            const setValue = (informEl, val) => {
                type(informEl.querySelector('#control'), val, true);
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
                setCb(informEl.querySelector('#control'), val, true);
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
                    informEl.querySelectorAll('input').forEach(radio => radio.checked = false);
                    informEl.querySelector('input').dispatchEvent(new Event('input', { bubbles: true }));
                    informEl.querySelector('input').dispatchEvent(new Event('change', { bubbles: true }));

                } else {
                    setCb(informEl.querySelector(`[value="${val}"]`), true, true);

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


            function setDirtyAndCheck() {
                expectNotDirty(initialValue);

                const newValue = generateValue(initialValue);

                // Change the value
                setValue(informEl, newValue);

                expectDirty(newValue);
            }

            it('sets the dirty flags when changed', async () => {
                setDirtyAndCheck();

            });

            it('resets the dirty flags when back to the initial value', async () => {
                setDirtyAndCheck();

                // Now back to initial value
                setValue(informEl, initialValue);

                expectNotDirty(initialValue);
            });

            it('resets the dirty flags when resetting with no parameter', async () => {
                setDirtyAndCheck();

                informEl.reset();

                expectNotDirty(initialValue);

            });

            it('resets the dirty flags when resetting with new values', async () => {
                setDirtyAndCheck();
                const newValue = generateValue(initialValue);


                informEl.reset({ field: newValue });

                expectNotDirty(newValue);
            });

            it('resets the dirty flags when resetting the form directly', async () => {
                setDirtyAndCheck();

                form.reset();
                await elementUpdated(informEl);

                expectNotDirty(initialValue);
            });

            it('resets the dirty flags when back to previous reset values', async () => {
                setDirtyAndCheck();

                const resetValue = generateValue(initialValue);

                informEl.reset({ field: resetValue });

                expectNotDirty(resetValue);

                const newValue = generateValue(resetValue);


                // Change the value
                setValue(informEl, newValue);

                expectDirty(newValue);

                // Now back to previous reset value
                setValue(informEl, resetValue);

                expectNotDirty(resetValue);
            });
        }



    });

    // it('has a "dirty" property and a "values" property and sets dirty classes', async () => {
    //     const informEl = await fixture(`
    //             <inform-el>
    //                 <form>
    //                     <inform-field id="inform-field1">
    //                         <input type="text" name="field1" value="initial-value"/>
    //                     </inform-field>
    //                     <inform-field id="inform-field2">
    //                         <input type="checkbox" name="field2" />
    //                     </inform-field>

    //                     <button type="submit">Submit</button>
    //                 </form>
    //             </inform-el>
    //     `);

    //     const input1 = informEl.querySelector('[name="field1"]');
    //     const field1 = informEl.querySelector('#inform-field1');
    //     const field2 = informEl.querySelector('#inform-field2');
    //     const form = informEl.querySelector('form');

    //     expect(informEl.dirty).to.equal(false);
    //     expect(informEl.values).to.eql({ field1: initialValue, field2: false });
    //     expect(informEl).not.to.have.class('dirty');
    //     expect(field1).not.to.have.class('dirty');
    //     expect(field2).not.to.have.class('dirty');

    //     console.log('changing');
    //     type(input1, 'something', true);

    //     awa;
    //     expect(informEl.dirty).to.equal(true);
    //     expect(informEl.values).to.eql({ field1: 'something', field2: false });
    //     expect(informEl).to.have.class('dirty');
    //     expect(field1).to.have.class('dirty');
    //     expect(field2).not.to.have.class('dirty');

    //     // Back to initial value => not dirty anymore
    //     type(input1, initialValue, true);

    //     expect(informEl.dirty).to.equal(false);
    //     expect(informEl.values).to.eql({ field1: '' });
    //     expect(informEl).not.to.have.class('dirty');
    //     expect(field1).not.to.have.class('dirty');
    //     expect(field2).not.to.have.class('dirty');

    //     form.reset();
    //     // Never dirty after reset
    //     expect(informEl.dirty).to.equal(false);
    //     expect(informEl.values).to.eql({ field1: initialValue, field2: false });
    //     expect(informEl).not.to.have.class('dirty');
    //     expect(field1).not.to.have.class('dirty');
    //     expect(field2).not.to.have.class('dirty');
    //     expect(input1.value).to.equal(initialValue);

    //     // Reset also works on informEl
    //     informEl.reset({ field1: 'something2', field2: true });

    //     // Not dirty after reset
    //     expect(informEl.dirty).to.equal(false);
    //     expect(informEl.values).to.eql({ field1: 'something2', field2: true });
    //     expect(informEl).not.to.have.class('dirty');
    //     expect(field1).not.to.have.class('dirty');
    //     expect(field2).not.to.have.class('dirty');
    //     expect(input1.value).to.equal('something2');


    //     // Change the value
    //     type(input1, 'something', true);

    //     expect(informEl.dirty).to.equal(true);
    //     expect(informEl.values).to.eql({ field1: 'something', field2: true });
    //     expect(informEl).to.have.class('dirty');
    //     expect(field1).to.have.class('dirty');
    //     expect(field2).not.to.have.class('dirty');

    //     // Back to the reset value => not dirty anymore
    //     type(input1, 'something2', true);

    //     expect(informEl.dirty).to.equal(false);
    //     expect(informEl.values).to.eql({ field1: 'something2', field2: true });
    //     expect(informEl).not.to.have.class('dirty');
    //     expect(field1).not.to.have.class('dirty');
    //     expect(field2).not.to.have.class('dirty');

    //     informEl.reset();

    //     // Never dirty after reset
    //     expect(informEl.dirty).to.equal(false);
    //     expect(informEl.values).to.eql({ field1: initialValue, field2: false });
    //     expect(informEl).not.to.have.class('dirty');
    //     expect(field1).not.to.have.class('dirty');
    //     expect(field2).not.to.have.class('dirty');
    //     expect(input1.value).to.equal(initialValue);


    // });
});
