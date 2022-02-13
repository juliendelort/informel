import { fixture, expect, elementUpdated, nextFrame } from '@open-wc/testing';
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
            expect(informEl.dirty).to.be.true;
            expect(informEl.values).to.eql({ field: expectedValue });
            expect(informEl).to.have.class('dirty');
            if (!skipInformField) {
                expect(informField).to.have.class('dirty');
            }
        }

        function expectNotDirty(expectedValue) {
            expect(informEl.dirty).to.be.false;
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
            await nextFrame();

            expectNotDirty(initialValue);

        });

        it('resets the dirty flags when resetting with new values', async () => {
            await setDirtyAndCheck();
            const newValue = generateValue(initialValue);

            informEl.reset({ field: newValue });
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

            informEl.reset({ field: resetValue });
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

});
