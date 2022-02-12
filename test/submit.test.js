import { fixture, expect, elementUpdated, nextFrame } from '@open-wc/testing';
import {
    type,
    clear,
    generateTextInputValue,
    setTextInputValue,
    setCheckboxValue,
    generateCheckboxValue,
    setRadioValue,
    generateRadioValue,
    setSelectValue,
    generateSelectValue,
    eventCheck
} from './test-utils';
import '../public/build/bundle.js';


describe('submit', () => {
    it('sends all fields to touched when submitting', async () => {

    });
    it('triggers the submit event with the form values if the form is valid', async () => {
        let receivedEventDetails = null;
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field>
                            <input type="text" name="some-name" required/>
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);

        const input = informEl.querySelector('[name="some-name"]');
        const submitButton = informEl.querySelector('[type="submit"]');

        await type(input, 'a', true);
        await clear(input);

        informEl.addEventListener('submit', ({ detail }) => {
            receivedEventDetails = detail;
        });

        submitButton.click();
        await nextFrame();

        expect(receivedEventDetails).to.be.null;

        // Fix the form
        await type(input, 'something');

        submitButton.click();
        await nextFrame();
        expect(receivedEventDetails).to.eql({ values: { 'some-name': 'something' } });

    });

    it('sends FormData if any value if of type File', async () => {

    });
});
