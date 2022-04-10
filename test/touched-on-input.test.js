import { fixture, expect } from '@open-wc/testing';
import {
    clear,
    eventCheck,
    type
} from './test-utils';
import '../public/build/bundle.js';

describe('touched-on-input', () => {
    it('shows error on input when present', async () => {
        const informEl = await fixture(`
           <inform-el>
               <form>
                    <inform-field touched-on-input>
                        <input type="text" name="someName" required value="a"/>
                    </inform-field>
                </form>
            </inform-el>`);

        const informField = informEl.querySelector('inform-field');
        const input = informEl.querySelector('input');

        await clear(input);

        expect(informField).to.have.attribute('error');
        expect(informField).to.have.attribute('touched');

        await type(input, 'b', false); // no blur

        expect(informField).not.to.have.attribute('error');
        expect(informField).to.have.attribute('touched');
    });

    it('doesn\'t affect submit-on-change', async () => {
        const informEl = await fixture(`
           <inform-el>
               <form>
                    <inform-field touched-on-input submit-on-change>
                        <input type="text" name="someName" required/>
                    </inform-field>
                </form>
            </inform-el>`);

        const informField = informEl.querySelector('inform-field');
        const input = informEl.querySelector('input');

        const [submitCalled] = eventCheck(informEl, 'submit');

        await type(input, 'a', false); // no blur

        expect(informField).to.have.attribute('touched');
        expect(submitCalled()).to.be.false;

        await type(input, 'b', true); // blur

        expect(submitCalled()).to.be.true;

    });
});
