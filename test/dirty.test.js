import { fixture, expect, elementUpdated, nextFrame } from '@open-wc/testing';
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
    clear
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
            expect(informEl).to.have.attribute('dirty');
            if (!skipInformField) {
                expect(informField).to.have.attribute('dirty');
            }
        }

        function expectNotDirty(expectedValue) {
            expect(informEl.dirty).to.be.false;
            expect(informEl.values).to.eql({ field: expectedValue });
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

});
