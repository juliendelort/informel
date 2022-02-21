import { expect, nextFrame, fixture, oneEvent } from '@open-wc/testing';
import { eventCheck, type } from './test-utils';
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

    it('triggers input and change events', async () => {
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

        const [inputEventCalled] = eventCheck(input, 'change');
        const [changeEventCalled] = eventCheck(input, 'change');

        const [hostInputEventCalled, hostInputEventDetails] = eventCheck(informEl, 'change');
        const [hostChangeEventCalled, hostChangeEventDetails] = eventCheck(informEl, 'change');

        informEl.setValues({ 'some-name': 'val' });
        await nextFrame();

        expect(inputEventCalled()).to.be.true;
        expect(changeEventCalled()).to.be.true;

        expect(hostInputEventCalled()).to.be.true;
        expect(hostChangeEventCalled()).to.be.true;

        expect(hostInputEventDetails()).to.eql({ values: { 'some-name': 'val' }, changedField: 'some-name' });
        expect(hostChangeEventDetails()).to.eql({ values: { 'some-name': 'val' }, changedField: 'some-name' });

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
});
