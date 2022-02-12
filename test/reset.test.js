import { fixture, expect, nextFrame } from '@open-wc/testing';
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

describe('reset', () => {
    describe('with text field', () => {
        runTests({
            html: `
                            <inform-el>
                                <form>
                                    <inform-field>
                                        <input id="control" type="text" name="field" value="some value"/>
                                    </inform-field>
                                    <button type="submit">Submit</button>
                                </form>
                            </inform-el>
                            `,
            setValue: setTextInputValue,
            generateValue: generateTextInputValue,
            initialValue: 'some value',
            hasInformField: true
        });
    });

    describe('with checkbox', () => {
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
            setValue: setCheckboxValue,
            generateValue: generateCheckboxValue,
            initialValue: true,
            hasInformField: true
        });
    });


    describe('with radio buttons', () => {
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
            setValue: setRadioValue,
            generateValue: generateRadioValue,
            initialValue: "val1",
            hasInformField: true
        });
    });

    describe('with select', () => {
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
            setValue: setSelectValue,
            generateValue: generateSelectValue,
            initialValue: "",
            hasInformField: true
        });
    });

    describe('with no inform-field', () => {
        runTests({
            html: `
                            <inform-el>
                                <form>
                                    <input id="control" type="text" name="field" value="some value"/>
                                    <button type="submit">Submit</button>
                                </form>
                            </inform-el>
                            `,
            setValue: setTextInputValue,
            generateValue: generateTextInputValue,
            initialValue: 'some value',
            hasInformField: false
        });
    });

    function runTests({ html, setValue, initialValue, generateValue, hasInformField }) {
        describe('when reseting the form', () => {

            it('resets the form values', async () => {
                const informEl = await fixture(html);
                const form = informEl.querySelector('form');
                const control = informEl.querySelector('#control');

                expect(informEl.values).to.eql({ field: initialValue });

                const newValue = generateValue(initialValue);
                await setValue(control, newValue);

                expect(informEl.values).to.eql({ field: newValue });

                form.reset();
                await nextFrame();
                // back to initial value
                expect(informEl.values).to.eql({ field: initialValue });
            });

            it('removes the dirty flags', async () => {
                const informEl = await fixture(html);
                const control = informEl.querySelector('#control');
                const form = informEl.querySelector('form');

                expect(informEl.dirty).to.be.false;

                const newValue = generateValue(initialValue);
                await setValue(control, newValue);

                expect(informEl.dirty).to.be.true;

                form.reset();
                await nextFrame();

                expect(informEl.dirty).to.be.false;
            });

            if (hasInformField) {
                it('removes the touched flags', async () => {
                    const informEl = await fixture(html);
                    const form = informEl.querySelector('form');

                    const informField = informEl.querySelector('inform-field');
                    const control = informEl.querySelector('#control');
                    expect(informField).not.to.have.attribute('touched');

                    const newValue = generateValue(initialValue);
                    await setValue(control, newValue);

                    expect(informField).to.have.attribute('touched');

                    form.reset();
                    await nextFrame();

                    expect(informField).not.to.have.attribute('touched');

                });
            }

        });
        describe('when resetting <inform-el>', () => {

            it('resets to the form initial values when no arguments', async () => {
                const informEl = await fixture(html);
                const control = informEl.querySelector('#control');

                expect(informEl.values).to.eql({ field: initialValue });

                const newValue = generateValue(initialValue);
                await setValue(control, newValue);

                expect(informEl.values).to.eql({ field: newValue });

                informEl.reset();


                // back to initial value
                expect(informEl.values).to.eql({ field: initialValue });
            });

            it('sets new values when provided ', async () => {
                const informEl = await fixture(html);

                expect(informEl.values).to.eql({ field: initialValue });

                const newValue = generateValue(initialValue);
                informEl.reset({ field: newValue });

                expect(informEl.values).to.eql({ field: newValue });
            });

            it('removes the dirty flags', async () => {
                const informEl = await fixture(html);
                const control = informEl.querySelector('#control');
                expect(informEl.dirty).to.be.false;

                const newValue = generateValue(initialValue);
                await setValue(control, newValue);

                expect(informEl.dirty).to.be.true;

                informEl.reset();

                expect(informEl.dirty).to.be.false;

            });

            if (hasInformField) {
                it('removes the touched flags', async () => {
                    const informEl = await fixture(html);
                    const informField = informEl.querySelector('inform-field');
                    const control = informEl.querySelector('#control');
                    expect(informField).not.to.have.attribute('touched');

                    const newValue = generateValue(initialValue);
                    await setValue(control, newValue);

                    expect(informField).to.have.attribute('touched');


                    informEl.reset();

                    expect(informField).not.to.have.attribute('touched');

                });
            }
        });
    }
});
