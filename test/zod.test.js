import { fixture, nextFrame, expect } from '@open-wc/testing';
import { z } from 'zod';
import { setTextInputValue } from './test-utils';
import '../public/build/bundle.js';


describe('zod', () => {

    it('validates using a zod schema', async () => {
        const Schema = z.object({
            email: z.string().email({
                message: 'my custom error message'
            }),
        });
        const informEl = await fixture(` <inform-el>
            <form>
                <inform-field>
                    <input id="control" type="text" name="email"  />
                </inform-field>
                <button type="submit">Submit</button>
            </form>
        </inform-el>`);

        informEl.zodSchema = Schema;

        const input = informEl.querySelector('#control');
        const submit = informEl.querySelector('[type="submit"]');
        const informField = informEl.querySelector('inform-field');


        await setTextInputValue(input, 'a');

        submit.click();

        await nextFrame();

        expect(informField).to.have.attribute('error');
        expect(informField).to.have.attribute('error-message', 'my custom error message');


    });

    it('reports empty fields as not present', async () => {
        const Schema = z.object({
            email: z.string({ required_error: 'required error' }).email({
                message: 'my custom error message'
            }),
        });
        const informEl = await fixture(` <inform-el>
            <form>
                <inform-field>
                    <input id="control" type="text" name="email"  />
                </inform-field>
                <button type="submit">Submit</button>
            </form>
        </inform-el>`);

        informEl.zodSchema = Schema;

        const submit = informEl.querySelector('[type="submit"]');
        const informField = informEl.querySelector('inform-field');

        submit.click();

        await nextFrame();

        expect(informField).to.have.attribute('error');
        expect(informField).to.have.attribute('error-message', 'required error');
    });

    it('does not break if an invalid schema is provided', async () => {

        const informEl = await fixture(` <inform-el>
            <form>
                <inform-field  default-error="default error" >
                    <input id="control" type="text" name="email" required />
                </inform-field>
                <button type="submit">Submit</button>
            </form>
        </inform-el>`);

        informEl.zodSchema = {};

        const submit = informEl.querySelector('[type="submit"]');
        const informField = informEl.querySelector('inform-field');

        submit.click();

        await nextFrame();

        expect(informField).to.have.attribute('error');
        expect(informField).to.have.attribute('error-message', 'default error');
    });

    it('gives priority to validationHandler when conflict', async () => {
        const Schema = z.object({
            email: z.string({ required_error: 'required error' }).email({
                message: 'my custom error message'
            }),
        });
        const informEl = await fixture(` <inform-el>
            <form>
                <inform-field>
                    <input id="control" type="email" name="email"  />
                </inform-field>
                <button type="submit">Submit</button>
            </form>
        </inform-el>`);

        informEl.zodSchema = Schema;
        informEl.validationHandler = () => ({ email: 'from validation handler' });

        const submit = informEl.querySelector('[type="submit"]');
        const informField = informEl.querySelector('inform-field');

        submit.click();

        await nextFrame();

        expect(informField).to.have.attribute('error');
        expect(informField).to.have.attribute('error-message', 'from validation handler');

    });

});
