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
    generateMultiSelectValue
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
            text: true,
            initialValue: ''
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
            text: true,
            initialValue: ''
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
            text: false,
            initialValue: false
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
            text: false,
            initialValue: ''
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
            text: false,
            initialValue: ''
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
            text: false,
            initialValue: ''
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
            initialValue: ''
        });
    });
    async function runTests({ html, setValue, generateValue, text, initialValue }) {
        const informEl = await fixture(html);
        const control = informEl.querySelector('#control');

        const [, changeDetails, resetChange] = eventCheck(informEl, 'change');
        const [, inputDetails, resetInput] = eventCheck(informEl, 'input');

        if (text) {
            const input = informEl.querySelector('#control');
            await type(input, 'something', false); // Only input
            await nextFrame();
            expect(inputDetails()).to.eql({
                values: {
                    'some-name': 'something',
                    other: 'nochange'
                },
                changedField: 'some-name'
            });
            expect(changeDetails()).to.be.null;
            resetInput();
            resetChange();
            await clear(input);
        }

        const newValue = generateValue();
        await setValue(control, newValue); // Both input and change
        await nextFrame();

        expect(inputDetails()).to.eql({
            values: {
                'some-name': newValue,
                other: 'nochange'
            },
            changedField: 'some-name'
        });
        expect(changeDetails()).to.eql({
            values: {
                'some-name': newValue,
                other: 'nochange'
            },
            changedField: 'some-name'
        });
    }
});
