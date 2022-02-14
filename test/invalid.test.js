import { fixture, expect } from '@open-wc/testing';
import {
    generateTextInputValue,
    setTextInputValue,
    setCheckboxValue,
    setSelectValue
} from './test-utils';
import '../public/build/bundle.js';

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
        expect(informEl.invalid).to.be.true;

        await setValue(control1, validValue);

        // Still invalid
        expect(informEl).to.have.class('invalid');
        expect(informEl.invalid).to.be.true;



        await setValue(control2, validValue);


        // Valid now
        expect(informEl).not.to.have.class('invalid');
        expect(informEl.invalid).to.be.false;



        // Remove value => invalid
        await setValue(control2, invalidValue);
        expect(informEl).to.have.class('invalid');
        expect(informEl.invalid).to.be.true;

    }

});
