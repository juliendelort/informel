import { expect, nextFrame, fixture, oneEvent } from '@open-wc/testing';
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
});
