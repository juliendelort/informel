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
    setSelectMultipleValue,
    generateMultiSelectValue
} from './test-utils';
import '../public/build/bundle.js';
import sinon from 'sinon';


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

    describe('with textarea', () => {
        runTests({
            html: `
                        <inform-el>
                            <form>
                                <inform-field>
                                    <textarea id="control" name="field" >some value</textarea>
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

    describe('with select multiple', () => {
        runTests({
            html: `
                                <inform-el>
                                    <form>
                                        <inform-field>
                                            <select id="control" name="field" multiple>
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
            setValue: setSelectMultipleValue,
            generateValue: generateMultiSelectValue,
            initialValue: [],
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
                await nextFrame();

                // back to initial value
                expect(informEl.values).to.eql({ field: initialValue });
            });

            it('sets new values when provided ', async () => {
                const informEl = await fixture(html);

                expect(informEl.values).to.eql({ field: initialValue });

                const newValue = generateValue(initialValue);
                informEl.reset({ field: newValue });
                await nextFrame();

                expect(informEl.values).to.eql({ field: newValue });
                expect(informEl.dirty).to.be.false;
            });

            it('removes the dirty flags', async () => {
                const informEl = await fixture(html);
                const control = informEl.querySelector('#control');
                expect(informEl.dirty).to.be.false;

                const newValue = generateValue(initialValue);
                await setValue(control, newValue);

                expect(informEl.dirty).to.be.true;

                informEl.reset();
                await nextFrame();

                expect(informEl.dirty).to.be.false;

            });

            it('keeps provided values as new initial values', async () => {
                const informEl = await fixture(html);
                const control = informEl.querySelector('#control');

                expect(informEl.values).to.eql({ field: initialValue });

                const newInitialValue = generateValue(initialValue);

                informEl.reset({ field: newInitialValue });

                await setValue(control, generateValue(newInitialValue));

                expect(informEl.values).not.to.eql({ field: newInitialValue });

                informEl.reset();
                await nextFrame();

                // back to initial value
                expect(informEl.values).to.eql({ field: newInitialValue });
            });

            if (hasInformField) {
                it('removes the touched flags and dirty flags when resetting with no value', async () => {
                    await removeTouchedDirtyTest((informEl) => {
                        informEl.reset();
                    });

                });

                it('removes the touched flags and dirty flags when resetting with a new value', async () => {
                    await removeTouchedDirtyTest((informEl) => {
                        informEl.reset({ field: generateValue(initialValue) });
                    });
                });

                async function removeTouchedDirtyTest(reset) {
                    const informEl = await fixture(html);
                    const informField = informEl.querySelector('inform-field');
                    const control = informEl.querySelector('#control');
                    expect(informField).not.to.have.attribute('touched');

                    const newValue = generateValue(initialValue);
                    await setValue(control, newValue);

                    expect(informField).to.have.attribute('touched');
                    expect(informField).to.have.attribute('dirty');

                    reset(informEl);

                    await nextFrame();

                    expect(informField).not.to.have.attribute('touched');
                    expect(informField).not.to.have.attribute('dirty');
                }
            }
        });
    }

    describe('with multiple fields', () => {
        it('reset fields that are not specified to their initial values', async () => {
            const informEl = await fixture(`
                        <inform-el>
                            <form>
                                <inform-field>
                                    <input type="text" name="field1" />
                                </inform-field>
                                <inform-field>
                                    <input  type="text" name="field2" value="field2 init"/>
                                </inform-field>
                                <inform-field>
                                    <input  type="text" name="field3"/>
                                </inform-field>
                                <button type="submit">Submit</button>
                            </form>
                        </inform-el>`);

            const field1Input = informEl.querySelector('[name="field1"]');
            const field2Input = informEl.querySelector('[name="field2"]');
            const field3Input = informEl.querySelector('[name="field3"]');

            await type(field2Input, 'field2 changed');

            informEl.reset({ field1: 'field1 reset' });
            await nextFrame();

            expect(field1Input).to.have.value('field1 reset');
            expect(field2Input).to.have.value('field2 init');
            expect(field3Input).to.have.value('');
            expect(informEl.values).to.eql({ field1: 'field1 reset', field2: 'field2 init', field3: '' });

            // Change values again and reset => back to the last reset
            await type(field1Input, 'field1 second change');
            informEl.reset({ field1: 'field1 reset' });

            await nextFrame();

            expect(field1Input).to.have.value('field1 reset');
            expect(field2Input).to.have.value('field2 init');
            expect(field3Input).to.have.value('');
            expect(informEl.values).to.eql({ field1: 'field1 reset', field2: 'field2 init', field3: '' });
        });
    });


    it('resets unknown values', async () => {
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field>
                            <input type="text" name="firstName" required />
                        </inform-field>                   
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
            `);
        informEl.validationHandler = sinon.stub();
        informEl.reset({ lastName: 'something' });
        await nextFrame();

        expect(informEl.dirty).to.be.false;
        expect(informEl.values.lastName).to.equal('something');

        informEl.setValues({ lastName: 'other' });
        await nextFrame();

        expect(informEl.dirty).to.be.true;
        expect(informEl.values.lastName).to.equal('other');

        informEl.reset();
        await nextFrame();

        expect(informEl.dirty).to.be.false;
        expect(informEl.values.lastName).to.equal('something');
    });

    it('resets unknown values when no initial reset', async () => {
        const informEl = await fixture(`
            <inform-el>
                <form>
                    <inform-field>
                        <input type="text" name="firstName" required />
                    </inform-field>                   
                    <button type="submit">Submit</button>
                </form>
            </inform-el>
        `);
        informEl.validationHandler = sinon.stub();
        await nextFrame();

        expect(informEl.dirty).to.be.false;

        informEl.setValues({ lastName: 'other' });
        await nextFrame();

        expect(informEl.dirty).to.be.true;
        expect(informEl.values.lastName).to.equal('other');

        informEl.reset();
        await nextFrame();

        expect(informEl.dirty).to.be.false;
        expect(informEl.values.lastName).to.equal(undefined);
    });

    it('resets unknown values when no initial reset with reset-on-submit', async () => {
        const informEl = await fixture(`
            <inform-el reset-on-submit>
                <form>
                    <inform-field>
                        <input type="text" name="firstName" />
                    </inform-field>                   
                    <button type="submit">Submit</button>
                </form>
            </inform-el>
        `);
        const submitButton = document.querySelector('button[type="submit"]');
        informEl.validationHandler = sinon.stub();
        await nextFrame();

        expect(informEl.dirty).to.be.false;

        informEl.setValues({ lastName: 'other' });
        await nextFrame();

        expect(informEl.dirty).to.be.true;
        expect(informEl.values.lastName).to.equal('other');

        submitButton.click();
        await nextFrame();

        expect(informEl.dirty).to.be.false;
        expect(informEl.values.lastName).to.equal(undefined);
    });

    it('resets touched for extra field', async () => {
        const informEl = await fixture(`
            <inform-el>
                <form>
                    <inform-field>
                        <input type="text" name="firstName" required />
                    </inform-field>
                    <inform-field name="lastName">
                    </inform-field>
                    <button type="submit">Submit</button>
                </form>
            </inform-el>
        `);
        const informFieldExtra = informEl.querySelector('inform-field[name="lastName"]');
        informEl.setValues({ lastName: 'something' });
        await nextFrame();

        expect(informFieldExtra).to.have.attribute('touched');

        informEl.reset();
        await nextFrame();

        expect(informFieldExtra).not.to.have.attribute('touched');

    });
});
