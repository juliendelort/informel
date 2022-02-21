import { fixture, expect } from '@open-wc/testing';
import {
    generateTextInputValue,
    setTextInputValue,
    setCheckboxValue,
    generateCheckboxValue,
    setRadioValue,
    generateRadioValue,
    setSelectValue,
    generateSelectValue
} from './test-utils';
import '../public/build/bundle.js';

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

    it('works with textarea', async () => {
        await runTests({
            html: `
                    <inform-el>
                        <form>
                            <inform-field id="field1">
                                <textarea class="control1"  name="some-name" required></textarea>
                            </inform-field>
                            <inform-field id="field2">
                                <textarea class="control2" name="some-description" required></textarea>
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
