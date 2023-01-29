import { expect, nextFrame, fixture } from '@open-wc/testing';
import { eventCheck, type } from './test-utils';
import sinon from 'sinon';

import '../public/build/bundle.js';


describe('set values', () => {
    it('sets the control value', async () => {
        const informEl = await fixture(`
            <inform-el>
                <form>
                    <inform-field >
                        <input type="text" name="some-name" required />
                    </inform-field>
                    <button type="submit">Submit</button>
                </form>
            </inform-el>
        `);

        const input = informEl.querySelector('[name="some-name"]');
        const informField = informEl.querySelector('inform-field');

        // Only set error when touched
        expect(informField).not.to.have.attribute('error');
        expect(informField).to.have.attribute('error-message', input.validationMessage);


        informEl.setValues({ 'some-name': 'val' });
        await nextFrame();

        expect(input).to.have.value('val');
        expect(informField).not.to.have.attribute('error');
        expect(informField).not.to.have.attribute('error-message');

        expect(informEl.values).to.eql({ 'some-name': 'val' });
    });

    it('merges the values for nested fields', async () => {
        const informEl = await fixture(`
            <inform-el>
                <form>
                    <inform-field >
                        <input type="text" name="some-name" required value="init" />
                    </inform-field>
                    <inform-field >
                        <input type="text" name="users[0].name" required value="init-name"/>
                    </inform-field>
                    <inform-field >
                        <input type="text" name="users[0].desc" id="desc" required />
                    </inform-field>
                    <button type="submit">Submit</button>
                </form>
            </inform-el>
        `);

        const input = informEl.querySelector('#desc');
        const informField = input.closest('inform-field');

        // Only set error when touched
        expect(informField).not.to.have.attribute('error');
        expect(informField).to.have.attribute('error-message', input.validationMessage);


        informEl.setValues({ users: [{ desc: 'some-desc' }] });
        await nextFrame();

        expect(input).to.have.value('some-desc');
        expect(informField).not.to.have.attribute('error');
        expect(informField).not.to.have.attribute('error-message');

        expect(informEl.values).to.eql({ 'some-name': 'init', users: [{ name: "init-name", desc: "some-desc" }] });
    });

    it('validates new values', async () => {
        const informEl = await fixture(`
            <inform-el>
                <form>
                    <inform-field >
                        <input type="text" name="some-name" required />
                    </inform-field>
                    <button type="submit">Submit</button>
                </form>
            </inform-el>
        `);

        const input = informEl.querySelector('[name="some-name"]');
        const informField = informEl.querySelector('inform-field');

        // Only set error when touched
        expect(informField).not.to.have.attribute('error');
        expect(informField).to.have.attribute('error-message', input.validationMessage);

        await type(input, 'something', true);

        expect(informField).not.to.have.attribute('error');
        expect(informField).not.to.have.attribute('error-message');

        // Set some invalid value (empty)
        informEl.setValues({ 'some-name': '' });
        await nextFrame();

        expect(informField).to.have.attribute('error');
        expect(informField).to.have.attribute('error-message', input.validationMessage);
    });

    it('sets the field to touched', async () => {
        const informEl = await fixture(`
            <inform-el>
                <form>
                    <inform-field >
                        <input type="text" name="some-name" required />
                    </inform-field>
                    <button type="submit">Submit</button>
                </form>
            </inform-el>
        `);

        const informField = informEl.querySelector('inform-field');

        informEl.setValues({ 'some-name': '' });
        await nextFrame();

        expect(informField).to.have.attribute('touched');
    });

    it('sets extra values', async () => {
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
        const input = informEl.querySelector('[name="firstName"]');
        informEl.validationHandler = sinon.stub();
        informEl.setValues({ lastName: 'something' });

        await nextFrame();

        expect(informEl.dirty).to.be.true;
        expect(informEl.values.lastName).to.equal('something');

        await type(input, 'a', true);

        expect(informEl.validationHandler).to.have.been.calledWith({ values: { firstName: 'a', lastName: 'something' } });

        informEl.setValues({ another: 'value' });

        await nextFrame();

        expect(informEl.validationHandler).to.have.been.calledWith({ values: { firstName: 'a', lastName: 'something', another: 'value' } });

    });

    it('sets and merges nested extra values', async () => {
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
        const input = informEl.querySelector('[name="firstName"]');
        informEl.validationHandler = sinon.stub();
        informEl.setValues({ lastName: 'something' });

        await nextFrame();

        expect(informEl.dirty).to.be.true;
        expect(informEl.values.lastName).to.equal('something');

        await type(input, 'a', true);

        expect(informEl.validationHandler).to.have.been.calledWith({ values: { firstName: 'a', lastName: 'something' } });

        informEl.setValues({ another: [{ name: ['value'] }] });

        await nextFrame();

        expect(informEl.validationHandler).to.have.been.calledWith({ values: { firstName: 'a', lastName: 'something', another: [{ name: ['value'] }] } });

        informEl.setValues({ another: [{ field: 'val' }] });

        await nextFrame();

        expect(informEl.validationHandler).to.have.been.calledWith({ values: { firstName: 'a', lastName: 'something', another: [{ name: ['value'], field: 'val' }] } });

    });

    it('sets radio button value', async () => {
        const informEl = await fixture(`
            <inform-el>
                <form>
                    <inform-field>
                        <input type="radio" name="field" value="val1" />
                        <input type="radio" name="field" value="val2" />
                    </inform-field>
                    <button type="submit">Submit</button>
                </form>
            </inform-el>
        `);

        const val1Input = informEl.querySelector('[value="val1"]');
        const val2Input = informEl.querySelector('[value="val2"]');

        informEl.setValues({ field: 'val2' });
        await nextFrame();

        expect(val2Input.checked).to.be.true;

        informEl.setValues({ field: 'val1' });
        await nextFrame();

        expect(val2Input.checked).to.be.false;
        expect(val1Input.checked).to.be.true;

    });

    it('sets radio button value when nested fields', async () => {
        const informEl = await fixture(`
            <inform-el>
                <form>
                    <inform-field>
                        <input type="radio" name="field.0.name" value="val1" />
                        <input type="radio" name="field.0.name" value="val2" />
                    </inform-field>
                    <button type="submit">Submit</button>
                </form>
            </inform-el>
        `);

        const val1Input = informEl.querySelector('[value="val1"]');
        const val2Input = informEl.querySelector('[value="val2"]');

        informEl.setValues({ field: [{ name: 'val2' }] });
        await nextFrame();

        expect(val2Input.checked).to.be.true;

        informEl.setValues({ field: [{ name: 'val1' }] });
        await nextFrame();

        expect(val2Input.checked).to.be.false;
        expect(val1Input.checked).to.be.true;

    });

    it('dispatches a inform-updated event', async () => {
        const informEl = await fixture(`
            <inform-el>
                <form>
                    <inform-field >
                        <input type="text" name="some-name" required />
                    </inform-field>
                    <button type="submit">Submit</button>
                </form>
            </inform-el>
        `);

        const input = informEl.querySelector('[name="some-name"]');

        const [informUpdatedTriggered] = eventCheck(input, 'inform-updated');


        informEl.setValues({ 'some-name': 'val' });
        await nextFrame();

        expect(informUpdatedTriggered()).to.be.true;
    });
});
