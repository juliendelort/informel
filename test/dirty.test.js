import { fixture, expect, nextFrame } from '@open-wc/testing';
import {
    generateTextInputValue,
    setTextInputValue,
    setCheckboxValue,
    generateCheckboxValue,
    setRadioValue,
    generateRadioValue,
    setSelectValue,
    generateSelectValue,
    type,
    clear,
    setSelectMultipleValue,
    generateMultiSelectValue,
    tab,
} from './test-utils';
import { sendKeys } from '@web/test-runner-commands';

import '../public/build/bundle.js';

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

    describe('with textarea field', () => {
        describe('with a initial value', () => {

            runTests({
                html: `
                        <inform-el>
                            <form>
                                <inform-field>
                                    <textarea id="control" name="field">initial value</textarea>
                                </inform-field>
                                <button type="submit">Submit</button>
                            </form>
                        </inform-el>
                    `,
                initialValue: 'initial value',
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
                                    <textarea id="control" name="field"></textarea>
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
                initialValue: undefined,
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
                                        <select id="control" name="field">
                                            <option value="">--Please choose an option--</option>
                                            <option value="val1">Value1</option>
                                            <option value="val2" selected>Value2</option>
                                            <option value="val3">Value3</option>
                                        </select>
                                    </inform-field>
                                    <button type="submit">Submit</button>
                                </form>
                            </inform-el>
                        `,
                initialValue: "val2",
                setValue: setSelectValue,
                generateValue: generateSelectValue
            });
        });
        describe('without a <inform-field> wrapper', () => {
            runTests({
                html: `
                            <inform-el>
                                <form>
                                    <select id="control" name="field">
                                        <option value="">--Please choose an option--</option>
                                        <option value="val1">Value1</option>
                                        <option value="val2" selected>Value2</option>
                                        <option value="val3">Value3</option>
                                    </select>
                                    <button type="submit">Submit</button>
                                </form>
                            </inform-el>
                        `,
                initialValue: "val2",
                setValue: setSelectValue,
                generateValue: generateSelectValue,
                skipInformField: true
            });
        });

    });

    describe('with select multiple field', () => {
        describe('without a initial value', () => {
            runTests({
                html: `
                            <inform-el>
                                <form>
                                    <inform-field>
                                        <select id="control" name="field" multiple >
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
                initialValue: [],
                setValue: setSelectMultipleValue,
                generateValue: generateMultiSelectValue
            });
        });

        describe('with a initial value', () => {

            runTests({
                html: `
                            <inform-el>
                                <form>
                                    <inform-field>
                                        <select id="control" name="field" multiple>
                                            <option value="">--Please choose an option--</option>
                                            <option value="val1" selected>Value1</option>
                                            <option value="val2" selected>Value2</option>
                                            <option value="val3">Value3</option>
                                        </select>
                                    </inform-field>
                                    <button type="submit">Submit</button>
                                </form>
                            </inform-el>
                        `,
                initialValue: ["val1", "val2"],
                setValue: setSelectMultipleValue,
                generateValue: generateMultiSelectValue
            });
        });
        describe('without a <inform-field> wrapper', () => {
            runTests({
                html: `
                            <inform-el>
                                <form>
                                    <select id="control" name="field" multiple>
                                        <option value="">--Please choose an option--</option>
                                        <option value="val1">Value1</option>
                                        <option value="val2">Value2</option>
                                        <option value="val3">Value3</option>
                                    </select>
                                    <button type="submit">Submit</button>
                                </form>
                            </inform-el>
                        `,
                initialValue: [],
                setValue: setSelectMultipleValue,
                generateValue: generateMultiSelectValue,
                skipInformField: true
            });
        });

        describe('with nested fields', () => {
            describe('with a initial value', () => {

                runTests({
                    html: `
                        <inform-el>
                            <form>
                                <inform-field id="control">
                                    <input type="text" name="fields.0.value" value="val1" />
                                </inform-field>
                                <button type="submit">Submit</button>
                            </form>
                        </inform-el>
                    `,
                    initialValue: "val1",
                    setValue: setRadioValue,
                    generateValue: generateRadioValue,
                    getFieldValue: (val) => ({ fields: [{ value: val }] })
                });
            });


            describe('without a initial value', () => {

                runTests({
                    html: `
                            <inform-el>
                                <form>
                                    <inform-field id="control">
                                       <input type="text" name="fields.0.value" />

                                    </inform-field>
                                    <button type="submit">Submit</button>
                                </form>
                            </inform-el>
                        `,
                    initialValue: undefined,
                    setValue: setRadioValue,
                    generateValue: generateRadioValue,
                    getFieldValue: (val) => ({ fields: [{ value: val }] })

                });
            });
        });

    });

    let informEl;
    let control;
    let informField;
    let form;


    function runTests({ html, initialValue, setValue, generateValue, skipInformField, getFieldValue = (val) => ({ field: val }) }) {
        function expectDirty(expectedValue) {
            expect(informEl.dirty).to.be.true;
            expect(informEl.values).to.eql(getFieldValue(expectedValue));
            expect(informEl).to.have.attribute('dirty');
            if (!skipInformField) {
                expect(informField).to.have.attribute('dirty');
            }
        }

        function expectNotDirty(expectedValue) {
            expect(informEl.dirty).to.be.false;
            if (expectedValue !== undefined) {
                expect(informEl.values).to.eql(getFieldValue(expectedValue));
            } else {
                expect(informEl.values).to.eql({}); // radio buttons: field not present when nothing selected

            }
            expect(informEl).not.to.have.attribute('dirty');
            if (!skipInformField) {
                expect(informField).not.to.have.attribute('dirty');
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
            await nextFrame();

            expectNotDirty(initialValue);

        });

        it('resets the dirty flags when resetting with new values', async () => {
            await setDirtyAndCheck();
            const newValue = generateValue(initialValue);

            informEl.reset(getFieldValue(newValue));
            await nextFrame();

            expectNotDirty(newValue);
        });

        it('resets the dirty flags when resetting the form directly', async () => {
            await setDirtyAndCheck();

            form.reset();
            await nextFrame();

            expectNotDirty(initialValue);
        });

        it('resets the dirty flags when back to previous reset values', async () => {
            await setDirtyAndCheck();

            const resetValue = generateValue(initialValue);

            informEl.reset(getFieldValue(resetValue));
            await nextFrame();

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

    it('doesn\'t make file inputs dirty for no reason', async () => {
        const informEl = await fixture(`
            <inform-el>
                <form>
                    <inform-field id="textfield">
                        <input id="control" type="text" name="field" />
                    </inform-field>
                    <inform-field id="filefield">
                        <input id="control" type="file" name="file" />
                    </inform-field>
                    <button type="submit">Submit</button>
                </form>
            </inform-el>
        `);


        const input = informEl.querySelector('#control');
        const textfield = informEl.querySelector('#textfield');
        const filefield = informEl.querySelector('#filefield');

        expect(informEl.dirty).to.be.false;
        expect(textfield).not.to.have.attribute('dirty');
        expect(filefield).not.to.have.attribute('dirty');

        await type(input, 'something');

        expect(informEl.dirty).to.be.true;
        expect(textfield).to.have.attribute('dirty');
        expect(filefield).not.to.have.attribute('dirty');

        await clear(input);

        expect(informEl.dirty).to.be.false;
        expect(textfield).not.to.have.attribute('dirty');
        expect(filefield).not.to.have.attribute('dirty');

    });

    it('works with extra values', async () => {
        const informEl = await fixture(` <inform-el>
            <form>
                <inform-field>
                    <input id="control" type="text" name="field" value="initial-value" />
                </inform-field>
                <button type="submit">Submit</button>
            </form>
        </inform-el>`);

        informEl.setValues({ field2: 'something' });
        await nextFrame();
        expect(informEl.dirty).to.be.true;

        informEl.reset({ field2: 'default' });
        await nextFrame();

        expect(informEl.dirty).to.be.false;

        informEl.setValues({ field2: 'other' });
        await nextFrame();

        expect(informEl.dirty).to.be.true;

        informEl.setValues({ field2: 'default' });
        await nextFrame();

        expect(informEl.dirty).to.be.false;
    });

    it('works with nested extra values', async () => {
        const informEl = await fixture(` <inform-el>
            <form>
                <inform-field>
                    <input id="control" type="text" name="field" value="initial-value" />
                </inform-field>
                <button type="submit">Submit</button>
            </form>
        </inform-el>`);

        informEl.setValues({ field2: [{ test: 'something' }] });
        await nextFrame();
        expect(informEl.dirty).to.be.true;

        informEl.reset({ field2: [{ default: 'field' }] });
        await nextFrame();

        expect(informEl.dirty).to.be.false;

        informEl.setValues({ field2: [{ other: 'field' }] });
        await nextFrame();

        expect(informEl.dirty).to.be.true;

        informEl.setValues({ field2: [{ default: 'field' }] });
        await nextFrame();

        expect(informEl.dirty).to.be.false;
    });


    it('updates the flag before sending inform-input event', async () => {

        const informEl = await fixture(` <inform-el>
            <form>
                <inform-field>
                    <input id="control" type="text" name="field"  />
                </inform-field>
                <button type="submit">Submit</button>
            </form>
        </inform-el>`);

        const input = informEl.querySelector('#control');
        input.focus();

        let expectedIsDirty;
        let expectedValues;
        let listenerCalled = false;

        informEl.addEventListener('inform-input', (e) => {
            expect(e.target.dirty).to.eql(expectedIsDirty);
            expect(e.target.values).to.eql(expectedValues);
            listenerCalled = true;
        });

        expectedIsDirty = true;
        expectedValues = { field: 'a' };
        await sendKeys({
            press: 'a',
        });

        await nextFrame();
        expect(listenerCalled).to.equal(true);
        listenerCalled = false;

        expectedIsDirty = false;
        expectedValues = { field: '' };

        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));

        await nextFrame();
        expect(listenerCalled).to.equal(true);

    });

    it('updates the flag before sending inform-change event', async () => {

        const informEl = await fixture(` <inform-el>
            <form>
                <inform-field>
                    <input id="control" type="text" name="field"  />
                </inform-field>
                <button type="submit">Submit</button>
            </form>
        </inform-el>`);

        const input = informEl.querySelector('#control');
        input.focus();

        let expectedIsDirty;
        let expectedValues;
        let listenerCalled = false;

        informEl.addEventListener('inform-change', (e) => {
            expect(e.target.dirty).to.eql(expectedIsDirty);
            expect(e.target.values).to.eql(expectedValues);
            listenerCalled = true;
        });


        expectedIsDirty = true;
        expectedValues = { field: 'a' };
        await sendKeys({
            press: 'a',
        });
        await tab();

        await nextFrame();
        expect(listenerCalled).to.equal(true);
        listenerCalled = false;

        expectedIsDirty = false;
        expectedValues = { field: '' };

        input.value = '';
        input.dispatchEvent(new Event('change', { bubbles: true }));

        await nextFrame();
        expect(listenerCalled).to.equal(true);

    });

});
