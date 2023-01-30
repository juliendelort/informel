import { fixture, expect, elementUpdated, nextFrame } from '@open-wc/testing';
import {
    type,
    clear
} from './test-utils';
import '../public/build/bundle.js';

describe('error', () => {
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

            // Not touched: no error displayed
            expect(getNativeContainer(informField)).not.to.exist;
            if (slot) {
                expect(getErrorContainer(informField)).to.have.rendered.text('');
            }

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

        // Not touched yet, not in error
        expect(informField).not.to.have.attribute('error');

        await type(input, 'a', true); // Should be native only
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField).to.have.attribute('error-message', input.validationMessage);
        expect(informField).to.have.attribute('error');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text(input.validationMessage);

        expect(input.validity.customError).to.be.false;
        expect(input.validity.patternMismatch).to.be.true;

        await clear(input);
        await type(input, 'ab'); // Should be a custom error only
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField).to.have.attribute('error-message', 'my custom error message');
        expect(informField).to.have.attribute('error');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text('my custom error message');
        expect(form.checkValidity()).to.be.false;
        expect(informEl).to.have.attribute('invalid');

        await clear(input);
        await type(input, 'cd'); // Should be both => still renders the custom one
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField).to.have.attribute('error-message', 'my custom error message');
        expect(informField).to.have.attribute('error');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text('my custom error message');

        await clear(input);
        await type(input, 'ef'); // Should be no error
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;
        expect(informField).not.to.have.attribute('error-message');
        expect(informField).not.to.have.attribute('error');
        expect(form.checkValidity()).to.be.true;
        expect(informEl).not.to.have.attribute('invalid');
    });

    it('considers validationHandler for nested fields', async () => {
        // There should be an error on the input because of the pattern
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field>
                            <input id="control" type="text" name="users[1].field.0.name" pattern="^ab|ef$"/>
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);
        const form = informEl.querySelector('form');
        const informField = informEl.querySelector('inform-field');
        const input = informEl.querySelector('#control');

        informEl.validationHandler = ({ values }) => {
            const result = {};
            if (values.users[1].field[0].name === 'ab' || values.users[1].field[0].name === 'cd') {
                result['users[1].field.0.name'] = 'my custom error message';
            }
            return result;
        };

        // Not touched yet, not in error
        expect(informField).not.to.have.attribute('error');

        await type(input, 'a', true); // Should be native only
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField).to.have.attribute('error-message', input.validationMessage);
        expect(informField).to.have.attribute('error');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text(input.validationMessage);

        expect(input.validity.customError).to.be.false;
        expect(input.validity.patternMismatch).to.be.true;

        await clear(input);
        await type(input, 'ab'); // Should be a custom error only
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField).to.have.attribute('error-message', 'my custom error message');
        expect(informField).to.have.attribute('error');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text('my custom error message');
        expect(form.checkValidity()).to.be.false;
        expect(informEl).to.have.attribute('invalid');

        await clear(input);
        await type(input, 'cd'); // Should be both => still renders the custom one
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField).to.have.attribute('error-message', 'my custom error message');
        expect(informField).to.have.attribute('error');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text('my custom error message');

        await clear(input);
        await type(input, 'ef'); // Should be no error
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).not.to.exist;
        expect(informField).not.to.have.attribute('error-message');
        expect(informField).not.to.have.attribute('error');
        expect(form.checkValidity()).to.be.true;
        expect(informEl).not.to.have.attribute('invalid');
    });

    it('normalizes keys returned by validationHandler for nested fields', async () => {
        // There should be an error on the input because of the pattern
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field>
                            <input id="control1" type="text" name="users[0].field.[0].name" />
                        </inform-field>
                        <inform-field>
                            <input id="control2" type="text" name="users.1.field.0.name"/>
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);
        const form = informEl.querySelector('form');
        const input1 = informEl.querySelector('#control1');
        const input2 = informEl.querySelector('#control2');

        const informField1 = input1.closest('inform-field');
        const informField2 = input2.closest('inform-field');

        informEl.validationHandler = ({ values }) => {
            return { // Inverted key format compared to field names
                'users.0.field.0.name': 'error field 1',
                'users[1].field[0].name': 'error field 2'
            };
        };

        // Not touched yet, not in error
        expect(informField1).not.to.have.attribute('error');

        await type(input1, 'a', true); // Should be native only
        await type(input2, 'a', true); // Should be native only
        expect(informField1.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField1).to.have.attribute('error-message', 'error field 1');
        expect(informField1).to.have.attribute('error');

        expect(informField2.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField2).to.have.attribute('error-message', 'error field 2');
        expect(informField2).to.have.attribute('error');


        expect(input1.validity.customError).to.be.true;
        expect(input2.validity.customError).to.be.true;


    });

    it('considers validationHandler event if submitted immediately', async () => {
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field>
                            <input type="text" name="some-name" value="a"/>
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);
        const informField = informEl.querySelector('inform-field');
        const submitButton = informEl.querySelector('[type="submit"]');

        informEl.validationHandler = ({ values }) => {
            const result = {};
            if (values['some-name'] === 'a') {
                result['some-name'] = 'my custom error message';
            }
            return result;
        };

        submitButton.click();
        await nextFrame();

        expect(informField).to.have.attribute('error');
        expect(informField).to.have.attribute('touched');
        expect(informField).to.have.attribute('error-message', 'my custom error message');
    });


    it('does not set aria-invalid if the error is not shown', async () => {
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
        const input = informEl.querySelector('input');

        // Input is required and empty, but not touched yet, so the error is not shown yet.
        expect(input).not.to.have.attribute('aria-invalid');
    });

    it('sets aria-invalid when invalid from validationHandler', async () => {
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field>
                            <input type="text" name="some-name" />
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);

        const informField = informEl.querySelector('inform-field');
        const input = informEl.querySelector('input');
        const errorEl = informField.querySelector('.informel-err-el-screen-reader');

        expect(input).not.to.have.attribute('aria-invalid');

        informEl.validationHandler = ({ values }) => {
            const result = {};
            if (values['some-name'] === 'a') {
                result['some-name'] = 'my custom error message';
            }
            return result;
        };

        await type(input, 'a', true);
        expect(input).to.have.attribute('aria-invalid', 'true');
        expect(errorEl).to.have.text('my custom error message');
        expect(errorEl.id.length).to.be.above(1);
        expect(input).to.have.attribute('aria-describedby', errorEl.id);

        await type(input, 'b', true);
        expect(input).not.to.have.attribute('aria-invalid');
        expect(input).not.to.have.attribute('aria-describedby');

    });

    it('sets aria-invalid when invalid from native attribute', async () => {
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field>
                            <input type="text" name="some-name" pattern="^ab$"/>
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);

        const informField = informEl.querySelector('inform-field');
        const input = informEl.querySelector('input');
        const errorEl = informField.querySelector('.informel-err-el-screen-reader');

        expect(input).not.to.have.attribute('aria-invalid');

        await type(input, 'a', true);
        expect(input).to.have.attribute('aria-invalid', 'true');
        expect(errorEl).to.have.text(input.validationMessage);
        expect(errorEl.id.length).to.be.above(1);
        expect(input).to.have.attribute('aria-describedby', errorEl.id);


        await type(input, 'b', true);

        expect(input).not.to.have.attribute('aria-invalid', 'true');
        expect(input).not.to.have.attribute('aria-describedby');

    });

    it('sets extra field returned by validationHandler in error', async () => {
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field>
                            <input type="text" name="some-name" value="a"/>
                        </inform-field>
                        <inform-field name="extra">
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);
        const informFieldExtra = informEl.querySelector('inform-field[name="extra"]');

        informEl.validationHandler = ({ values }) => {
            return { extra: 'Extra field invalid!' };
        };

        informEl.setValues({ extra: 'anything' });
        await nextFrame();

        expect(informEl).to.have.attribute('invalid');
        expect(informFieldExtra).to.have.attribute('touched');
        expect(informFieldExtra).to.have.attribute('error');
        expect(informFieldExtra).to.have.attribute('error-message', 'Extra field invalid!');

        informEl.validationHandler = ({ values }) => {
            return null;
        };

        informEl.setValues({ extra: 'something else' });
        await nextFrame();


        expect(informFieldExtra).not.to.have.attribute('error');
        expect(informFieldExtra).not.to.have.attribute('error-message', 'Extra field invalid!');
        expect(informEl).not.to.have.attribute('invalid');
    });

    it('sets nested extra field returned by validationHandler in error', async () => {
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field>
                            <input type="text" name="some-name" value="a"/>
                        </inform-field>
                        <inform-field id="extra" name="extra[1].name">
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);
        const informFieldExtra = informEl.querySelector('inform-field#extra');

        let receivedValues;
        informEl.validationHandler = ({ values }) => {
            receivedValues = values;
            return { 'extra[1].name': 'Extra field invalid!' };
        };

        informEl.setValues({ extra: [undefined, { name: 'anything' }] });
        await nextFrame();

        expect(receivedValues).to.deep.equal({ 'some-name': 'a', extra: [undefined, { name: 'anything' }] });
        expect(informEl).to.have.attribute('invalid');
        expect(informFieldExtra).to.have.attribute('touched');
        expect(informFieldExtra).to.have.attribute('error-message', 'Extra field invalid!');

        expect(informFieldExtra).to.have.attribute('error');

        informEl.validationHandler = ({ values }) => {
            return null;
        };

        informEl.setValues({ extra: [undefined, { name: 'something else' }] });
        await nextFrame();

        expect(informFieldExtra).not.to.have.attribute('error');
        expect(informFieldExtra).not.to.have.attribute('error-message', 'Extra field invalid!');
        expect(informEl).not.to.have.attribute('invalid');
    });

    it('normalized validationHandler result for nested fields', async () => {
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field id="extra1" name="extra.0.name">
                        </inform-field>
                        <inform-field id="extra2" name="extra[1].name">
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);
        const informFieldExtra1 = informEl.querySelector('inform-field#extra1');
        const informFieldExtra2 = informEl.querySelector('inform-field#extra2');

        informEl.validationHandler = ({ values }) => {
            return {
                'extra[0].name': 'Extra field 1 invalid!',
                'extra.1.name': 'Extra field 2 invalid!'
            };
        };

        informEl.setValues({ extra: [{ name: 'anything1' }, { name: 'anything2' }] });
        await nextFrame();

        expect(informEl).to.have.attribute('invalid');
        expect(informFieldExtra1).to.have.attribute('touched');
        expect(informFieldExtra1).to.have.attribute('error-message', 'Extra field 1 invalid!');
        expect(informFieldExtra1).to.have.attribute('error');

        expect(informFieldExtra2).to.have.attribute('touched');
        expect(informFieldExtra2).to.have.attribute('error-message', 'Extra field 2 invalid!');
        expect(informFieldExtra2).to.have.attribute('error');

    });


    it('validates extrafield not yet set', async () => {
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field name="extra">
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);
        const informFieldExtra = informEl.querySelector('inform-field[name="extra"]');
        const submitButton = informEl.querySelector('button[type="submit"]');

        informEl.validationHandler = ({ values }) => {
            return { extra: 'Extra field invalid!' };
        };

        submitButton.click();
        await nextFrame();


        expect(informEl).to.have.attribute('invalid');
        expect(informFieldExtra).to.have.attribute('touched');
        expect(informFieldExtra).to.have.attribute('error');
        expect(informFieldExtra).to.have.attribute('error-message', 'Extra field invalid!');
    });

    it('validates nested extrafield not yet set', async () => {
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field id="extra" name="extra.name[0].1">
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);
        const informFieldExtra = informEl.querySelector('inform-field#extra');
        const submitButton = informEl.querySelector('button[type="submit"]');

        informEl.validationHandler = ({ values }) => {
            return { 'extra.name[0][1]': 'Extra field invalid!' };
        };

        submitButton.click();
        await nextFrame();


        expect(informEl).to.have.attribute('invalid');
        expect(informFieldExtra).to.have.attribute('touched');
        expect(informFieldExtra).to.have.attribute('error');
        expect(informFieldExtra).to.have.attribute('error-message', 'Extra field invalid!');
    });
});
