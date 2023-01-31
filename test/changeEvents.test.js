import { fixture, expect, nextFrame } from '@open-wc/testing';
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
    eventCheck,
    setSelectMultipleValue,
    generateMultiSelectValue,
    generateNumberValue
} from './test-utils';
import '../public/build/bundle.js';

describe('input and change events', () => {

    it('works with text input', async () => {
        await runTests({
            html: `
                    <inform-el>
                        <form>
                            <inform-field>
                                <input id="control" type="text" name="some-name"/>
                            </inform-field>
                             <input  type="text" name="other" value="nochange"/>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
            setValue: setTextInputValue,
            generateValue: generateTextInputValue,
            text: true
        });
    });

    it('works with nested field text input', async () => {
        await runTests({
            html: `
                    <inform-el>
                        <form>
                            <inform-field>
                                <input id="control" type="text" name="users[1].field.0.name"/>
                            </inform-field>
                             <input  type="text" name="other" value="nochange"/>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
            setValue: setTextInputValue,
            generateValue: generateTextInputValue,
            text: true,
            getFieldValue: val => ({ users: [undefined, { field: [{ name: val }] }] }),
            fieldName: 'users[1].field.0.name'
        });
    });

    it('works with number input', async () => {
        await runTests({
            html: `
                    <inform-el>
                        <form>
                            <inform-field>
                                <input id="control" type="number" name="some-name"/>
                            </inform-field>
                             <input  type="text" name="other" value="nochange"/>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
            setValue: setTextInputValue,
            generateValue: generateNumberValue,
            text: true
        });
    });

    it('works with nested number input', async () => {
        await runTests({
            html: `
                    <inform-el>
                        <form>
                            <inform-field>
                                <input id="control" type="number" name="users[1].field.0.name"/>
                            </inform-field>
                             <input  type="text" name="other" value="nochange"/>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
            setValue: setTextInputValue,
            generateValue: generateNumberValue,
            text: true,
            getFieldValue: val => ({ users: [undefined, { field: [{ name: val }] }] }),
            fieldName: 'users[1].field.0.name'
        });
    });

    it('works with textarea', async () => {
        await runTests({
            html: `
                    <inform-el>
                        <form>
                            <inform-field>
                                <textarea id="control" name="some-name"></textarea>
                            </inform-field>
                             <input  type="text" name="other" value="nochange"/>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
            setValue: setTextInputValue,
            generateValue: generateTextInputValue,
            text: true
        });
    });

    it('works with nested field textarea', async () => {
        await runTests({
            html: `
                    <inform-el>
                        <form>
                            <inform-field>
                                <textarea id="control" name="users[1].field.0.name"></textarea>
                            </inform-field>
                             <input  type="text" name="other" value="nochange"/>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
            setValue: setTextInputValue,
            generateValue: generateTextInputValue,
            text: true,
            getFieldValue: val => ({ users: [undefined, { field: [{ name: val }] }] }),
            fieldName: 'users[1].field.0.name'
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
                            <input  type="text" name="other" value="nochange"/>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
            setValue: setCheckboxValue,
            generateValue: generateCheckboxValue,
            text: false
        });
    });

    it('works with nested field checkbox', async () => {
        await runTests({
            html: `
                    <inform-el>
                        <form>
                            <inform-field>
                                <input id="control" type="checkbox" name="users[1].field.0.name"/>
                            </inform-field>
                            <input  type="text" name="other" value="nochange"/>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
            setValue: setCheckboxValue,
            generateValue: generateCheckboxValue,
            text: false,
            getFieldValue: val => ({ users: [undefined, { field: [{ name: val }] }] }),
            fieldName: 'users[1].field.0.name'
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
                            <input  type="text" name="other" value="nochange"/>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
            setValue: setRadioValue,
            generateValue: generateRadioValue,
            text: false
        });
    });

    it('works with nested field radio button', async () => {
        await runTests({
            html: `
                    <inform-el>
                        <form>
                            <inform-field id="control">
                                <input  type="radio" name="users[1].field.0.name" value="val1"/>
                                <input  type="radio" name="users[1].field.0.name" value="val2"/>
                            </inform-field>
                            <input  type="text" name="other" value="nochange"/>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
            setValue: setRadioValue,
            generateValue: generateRadioValue,
            text: false,
            getFieldValue: val => ({ users: [undefined, { field: [{ name: val }] }] }),
            fieldName: 'users[1].field.0.name'
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
                            <input  type="text" name="other" value="nochange"/>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
            setValue: setSelectValue,
            generateValue: generateSelectValue,
            text: false
        });
    });

    it('works with nested field select', async () => {
        await runTests({
            html: `
                    <inform-el>
                        <form>
                            <inform-field>
                                <select id="control" name="users[1].field.0.name">
                                    <option value="">--Please choose an option--</option>
                                    <option value="val1">Value1</option>
                                    <option value="val2">Value2</option>
                                    <option value="val3">Value3</option>
                                </select>
                            </inform-field>
                            <input  type="text" name="other" value="nochange"/>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
            setValue: setSelectValue,
            generateValue: generateSelectValue,
            text: false,
            getFieldValue: val => ({ users: [undefined, { field: [{ name: val }] }] }),
            fieldName: 'users[1].field.0.name'
        });
    });

    it('works with select multiple', async () => {
        await runTests({
            html: `
                    <inform-el>
                        <form>
                            <inform-field>
                                <select id="control" name="some-name" multiple>
                                    <option value="">--Please choose an option--</option>
                                    <option value="val1">Value1</option>
                                    <option value="val2">Value2</option>
                                    <option value="val3">Value3</option>
                                </select>
                            </inform-field>
                            <input  type="text" name="other" value="nochange"/>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
            setValue: setSelectMultipleValue,
            generateValue: generateMultiSelectValue,
            text: false
        });
    });

    it('works with nested field select multiple', async () => {
        await runTests({
            html: `
                    <inform-el>
                        <form>
                            <inform-field>
                                <select id="control" name="users[1].field.0.name" multiple>
                                    <option value="">--Please choose an option--</option>
                                    <option value="val1">Value1</option>
                                    <option value="val2">Value2</option>
                                    <option value="val3">Value3</option>
                                </select>
                            </inform-field>
                            <input  type="text" name="other" value="nochange"/>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
            setValue: setSelectMultipleValue,
            generateValue: generateMultiSelectValue,
            text: false,
            getFieldValue: val => ({ users: [undefined, { field: [{ name: val }] }] }),
            fieldName: 'users[1].field.0.name'
        });
    });

    it('works without inform-field', async () => {
        await runTests({
            html: `
                    <inform-el>
                        <form>
                            <input id="control" type="text" name="some-name"/>
                            <input  type="text" name="other" value="nochange"/>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
            setValue: setTextInputValue,
            generateValue: generateTextInputValue,
            text: true,
        });
    });

    it('works with nested fields without inform-field', async () => {
        await runTests({
            html: `
                    <inform-el>
                        <form>
                            <input id="control" type="text" name="users[1].field.0.name"/>
                            <input  type="text" name="other" value="nochange"/>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `,
            setValue: setTextInputValue,
            generateValue: generateTextInputValue,
            text: true,
            getFieldValue: val => ({ users: [undefined, { field: [{ name: val }] }] }),
            fieldName: 'users[1].field.0.name'
        });
    });
    async function runTests({ html, setValue, generateValue, text, getFieldValue = (val) => ({ 'some-name': val }), fieldName = 'some-name' }) {
        const informEl = await fixture(html);
        const control = informEl.querySelector('#control');

        const [, changeDetails, resetChange] = eventCheck(informEl, 'inform-change');
        const [, inputDetails, resetInput] = eventCheck(informEl, 'inform-input');

        if (text) {
            const someValue = generateValue();
            const input = informEl.querySelector('#control');
            await type(input, someValue, false); // Only input
            await nextFrame();
            expect(inputDetails()).to.deep.equal({
                values: {
                    ...getFieldValue(someValue),
                    other: 'nochange'
                },
                changedField: fieldName
            });
            expect(changeDetails()).to.be.null;
            resetInput();
            resetChange();
            await clear(input);
        }

        const newValue = generateValue();
        await setValue(control, newValue, true); // Both input and change
        await nextFrame();

        expect(inputDetails()).to.deep.equal({
            values: {
                ...getFieldValue(newValue),
                other: 'nochange'
            },
            changedField: fieldName
        });
        expect(changeDetails()).to.deep.equal({
            values: {
                ...getFieldValue(newValue),
                other: 'nochange'
            },
            changedField: fieldName
        });
    }

    it('works when only change event is triggered', async () => {
        const informEl = await fixture(`<inform-el>
                        <form>
                            <inform-field>
                                <input id="control" type="text" name="some-name"/>
                            </inform-field>
                             <input  type="text" name="other" value="nochange"/>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>`);
        const control = informEl.querySelector('#control');

        control.addEventListener('input', e => e.stopPropagation()); // block input event

        const [, changeDetails] = eventCheck(informEl, 'inform-change');

        const someValue = generateTextInputValue();
        const input = informEl.querySelector('#control');
        await type(input, someValue, true);
        await nextFrame();
        expect(changeDetails()).to.eql({
            values: {
                'some-name': someValue,
                other: 'nochange'
            },
            changedField: 'some-name'
        });
    });

    it('does not include empty number fields in the values', async () => {
        const informEl = await fixture(`
                    <inform-el>
                        <form>
                            <input id="control" type="number" name="age"/>
                        </form>
                    </inform-el>
                `);
        const control = informEl.querySelector('#control');

        expect(informEl.values).to.eql({});

        await type(control, '10', true);

        expect(informEl.values).to.eql({ age: 10 });

        await clear(control);

        expect(informEl.values).to.eql({});

        await type(control, '-20.56', true);

        expect(informEl.values).to.eql({ age: -20.56 });


    });
});
