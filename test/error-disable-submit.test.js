import { fixture, expect, nextFrame } from '@open-wc/testing';
import {
    generateTextInputValue,
    setTextInputValue,
    setCheckboxValue,
    setSelectValue,
    setSelectMultipleValue
} from './test-utils';
import '../public/build/bundle.js';

describe('error-disable-submit', () => {

    describe('with text input', () => {
        runTests({
            html: `
                        <form>
                            <inform-field>
                                <input id="control" type="text" name="some-name" required />
                            </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                `,

            setValue: setTextInputValue,
            validValue: generateTextInputValue(),
            invalidValue: ''
        });

    });

    describe('with nested field text input', () => {
        runTests({
            html: `
                        <form>
                            <inform-field>
                                <input id="control" type="text" name="users[1].field.0.name" required />
                            </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                `,

            setValue: setTextInputValue,
            validValue: generateTextInputValue(),
            invalidValue: ''
        });

    });

    describe('with checkbox', () => {
        runTests({
            html: `
                        <form>
                            <inform-field>
                                <input id="control" type="checkbox" name="some-name" required/>
                             </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                `,

            setValue: setCheckboxValue,
            validValue: true,
            invalidValue: false
        });

    });

    describe('with nested field checkbox', () => {
        runTests({
            html: `
                        <form>
                            <inform-field>
                                <input id="control" type="checkbox" name="users[1].field.0.name" required/>
                             </inform-field>
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
                            <inform-field>
                                <select id="control" name="field" required>
                                    <option value="">--Please choose an option--</option>
                                    <option value="val1">Value1</option>
                                    <option value="val2">Value2</option>
                                    <option value="val3">Value3</option>
                                </select>
                             </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                `,
            setValue: setSelectValue,
            validValue: 'val2',
            invalidValue: ''
        });
    });

    describe('with nested field select', async () => {
        await runTests({
            html: `
                        <form>
                            <inform-field>
                                <select id="control" name="users[1].field.0.name" required>
                                    <option value="">--Please choose an option--</option>
                                    <option value="val1">Value1</option>
                                    <option value="val2">Value2</option>
                                    <option value="val3">Value3</option>
                                </select>
                             </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                `,
            setValue: setSelectValue,
            validValue: 'val2',
            invalidValue: ''
        });
    });


    describe('with select multiple', async () => {
        await runTests({
            html: `
                        <form>
                            <inform-field>
                                <select id="control" name="field" required multiple>
                                    <option value="">--Please choose an option--</option>
                                    <option value="val1">Value1</option>
                                    <option value="val2">Value2</option>
                                    <option value="val3">Value3</option>
                                </select>
                             </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                `,
            setValue: setSelectMultipleValue,
            validValue: ['val2'],
            invalidValue: []
        });
    });

    describe('with nested field select multiple', async () => {
        await runTests({
            html: `
                        <form>
                            <inform-field>
                                <select id="control" name="users[1].field.0.name" required multiple>
                                    <option value="">--Please choose an option--</option>
                                    <option value="val1">Value1</option>
                                    <option value="val2">Value2</option>
                                    <option value="val3">Value3</option>
                                </select>
                             </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                `,
            setValue: setSelectMultipleValue,
            validValue: ['val2'],
            invalidValue: []
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
            const control = informEl.querySelector('#control');


            // Form is invalid but button is not disabled
            expect(informEl.querySelector('[type="submit"]')).not.to.have.attr('disabled');

            // Set error-disable-submit
            informEl.setAttribute('error-disable-submit', '');

            // Form not touched, error not shown yet => not disabled
            expect(informEl.querySelector('[type="submit"]')).not.to.have.attr('disabled');

            await setValue(control, validValue); //  Making sure the control is touched
            await setValue(control, invalidValue);

            // Error shown => disabled
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


            // Form is invalid but not touched => not disabled
            expect(informEl).to.have.attribute('invalid');
            expect(informEl.querySelector('[type="submit"]')).not.to.have.attr('disabled');

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
