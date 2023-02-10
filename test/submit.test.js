import { fixture, expect, nextFrame } from '@open-wc/testing';
import {
    type,
    clear,
    eventCheck
} from './test-utils';
import sinon from 'sinon';
import '../public/build/bundle.js';


const formUrl = '/some/url';
const expectedUrl = new URL(formUrl, window.location.href);

describe('submit', () => {
    it('sets all fields to touched and shows errors if invalid', async () => {
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

        const informField = informEl.querySelector('inform-field');
        const submitButton = informEl.querySelector('[type="submit"]');
        const input = informEl.querySelector('input');

        const [submitHasBeenCalled] = eventCheck(informEl, 'inform-submit');


        expect(informField).not.to.have.attribute('touched');
        submitButton.click();


        expect(submitHasBeenCalled()).to.be.false;
        expect(informField).to.have.attribute('touched');
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.exist;
        expect(informField.shadowRoot.getRootNode().querySelector('[role="alert"]')).to.have.rendered.text(input.validationMessage);
    });


    it('triggers the submit event with the form values if the form is valid', async () => {
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
        const form = informEl.querySelector('form');

        await type(input, 'a', true);
        await clear(input);

        const [submitHasBeenCalled, submitDetails] = eventCheck(informEl, 'inform-submit');

        submitButton.click();
        await nextFrame();

        expect(submitHasBeenCalled()).to.be.false;

        // Fix the form
        await type(input, 'something');

        submitButton.click();
        await nextFrame();
        expect(submitDetails()).to.deep.include({ values: { 'some-name': 'something' } });
    });

    it('removes dirty and touched after submitting', async () => {
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
        const informField = informEl.querySelector('inform-field');

        await type(input, 'a', true);

        expect(informEl.dirty).to.be.true;
        expect(informEl).to.have.attribute('dirty');
        expect(informField).to.have.attribute('dirty');
        expect(informField).to.have.attribute('touched');

        submitButton.click();
        await nextFrame();

        expect(informEl.dirty).to.be.false;
        expect(informEl).not.to.have.attribute('dirty');
        expect(informField).not.to.have.attribute('dirty');
        expect(informField).not.to.have.attribute('touched');
    });

    describe('reset-on-submit', () => {
        it('does\'nt reset if not present', async () => {
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

            const submitButton = informEl.querySelector('[type="submit"]');
            const input = informEl.querySelector('input');

            const [submitHasBeenCalled, , resetSubmit] = eventCheck(informEl, 'inform-submit');

            await type(input, 'something', true);

            submitButton.click();
            await nextFrame();

            expect(submitHasBeenCalled()).to.be.true;

            // Not reset
            expect(input).to.have.value('something');

        });

        it('resets if  present', async () => {
            const informEl = await fixture(`
                    <inform-el reset-on-submit>
                        <form>
                            <inform-field>
                                <input type="text" name="some-name" required/>
                            </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
            `);

            const submitButton = informEl.querySelector('[type="submit"]');
            const input = informEl.querySelector('input');


            const [submitHasBeenCalled] = eventCheck(informEl, 'inform-submit');

            await type(input, 'something', true);

            submitButton.click();
            await nextFrame();

            expect(submitHasBeenCalled()).to.be.true;

            // Reset
            expect(input).to.have.value('');

        });
    });

    describe('submit action', () => {

        beforeEach(() => {
            window.fetch = sinon.stub();
        });
        afterEach(() => {
            sinon.restore();
        });
        it('sends an ajax call if the form is valid', async () => {
            const informEl = await fixture(`
                    <inform-el>
                        <form action="${formUrl}" method="POST">
                            <inform-field>
                                <input type="text" name="field" required/>
                            </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
            `);

            const submitButton = informEl.querySelector('[type="submit"]');
            const input = informEl.querySelector('input');

            const [, requestStartDetails] = eventCheck(informEl, 'request-start');
            const [, requestEndDetails] = eventCheck(informEl, 'request-end');

            await type(input, 'a', true);

            submitButton.click();

            expect(window.fetch).to.have.been.calledWith(expectedUrl.toString(), {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ field: 'a' })
            });

            await nextFrame();

            expect(requestStartDetails()).to.deep.include({ values: { field: 'a' } });
            expect(requestEndDetails()).to.deep.include({ values: { field: 'a' } });

        });

        it('considers the method attribute', async () => {
            const informEl = await fixture(`
                    <inform-el>
                        <form  action="${formUrl}" method="GET">
                            <inform-field>
                                <input type="text" name="field" required/>
                            </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
            `);

            const submitButton = informEl.querySelector('[type="submit"]');
            const input = informEl.querySelector('input');

            await type(input, 'a', true);

            submitButton.click();

            expect(window.fetch).to.have.been.calledWith(`${expectedUrl}?field=a`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
        });

        it('works for methods other than get and post', async () => {
            const informEl = await fixture(`
                    <inform-el>
                        <form  action="${formUrl}" method="PUT">
                            <inform-field>
                                <input type="text" name="field" required/>
                            </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
            `);

            const submitButton = informEl.querySelector('[type="submit"]');
            const input = informEl.querySelector('input');

            await type(input, 'a', true);

            submitButton.click();

            expect(window.fetch).to.have.been.called;

            const callArgs = window.fetch.getCall(0).args;
            expect(callArgs[0]).to.equal(expectedUrl.toString());

            const { method, headers, body } = callArgs[1];

            expect(method).to.equal('PUT');
            expect(headers).to.deep.include({ "Content-Type": "application/json" });
            expect(JSON.parse(body)).to.deep.include({ field: 'a' });
        });

        it('supports the formaction attribute', async () => {
            const informEl = await fixture(`
                    <inform-el>
                        <form  action="${formUrl}" method="GET">
                            <inform-field>
                                <input type="text" name="field" required/>
                            </inform-field>
                            <button type="submit" id="submit1" >Submit1</button>
                            <button type="submit" id="submit2" formaction="/url2" formmethod="PUT">Submit2</button>
                        </form>
                    </inform-el>
            `);

            const submitButton1 = informEl.querySelector('#submit1');
            const submitButton2 = informEl.querySelector('#submit2');
            const input = informEl.querySelector('input');

            await type(input, 'a', true);

            submitButton2.click();

            expect(window.fetch).to.have.been.calledWith(new URL('/url2', window.location.href).toString(), {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ field: 'a' })
            });

            window.fetch.resetHistory();

            submitButton1.click();

            expect(window.fetch).to.have.been.calledWith(`${expectedUrl}?field=a`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
        });

        it('defaults to GET when method is not specified', async () => {
            const informEl = await fixture(`
                    <inform-el>
                        <form  action="${formUrl}">
                            <inform-field>
                                <input type="text" name="field" required/>
                            </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
            `);

            const submitButton = informEl.querySelector('[type="submit"]');
            const input = informEl.querySelector('input');

            await type(input, 'a', true);

            submitButton.click();

            expect(window.fetch).to.have.been.calledWith(`${expectedUrl}?field=a`, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            });
        });

        it('works with search params already in the url', async () => {
            const informEl = await fixture(`
                    <inform-el>
                        <form  action="${formUrl}?already=present" method="GET">
                            <inform-field>
                                <input type="text" name="field" required/>
                            </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
            `);

            const submitButton = informEl.querySelector('[type="submit"]');
            const input = informEl.querySelector('input');

            await type(input, 'a', true);

            submitButton.click();

            expect(window.fetch).to.have.been.calledWith(`${expectedUrl}?already=present&field=a`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
        });

        it('sets the "submitting" class and disables submit button while submitting', async () => {
            const informEl = await fixture(`
                    <inform-el>
                        <form action="${formUrl}" method="POST">
                            <inform-field>
                                <input type="text" name="field" required />
                            </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
                `);

            const submitButton = informEl.querySelector('[type="submit"]');
            const input = informEl.querySelector('input');

            await type(input, 'a', true);

            let resolveFetch;
            const fetchPromise = new Promise((resolve) => resolveFetch = resolve);
            window.fetch.returns(fetchPromise);

            expect(informEl).not.to.have.attribute('submitting');
            expect(informEl.submitting).to.be.false;

            expect(submitButton).not.to.have.attribute('disabled');

            submitButton.click();
            await nextFrame();

            expect(informEl).to.have.attribute('submitting');
            expect(informEl.submitting).to.be.true;

            expect(submitButton).to.have.attribute('disabled');
            resolveFetch();
            await nextFrame();

            expect(informEl).not.to.have.attribute('submitting');
            expect(informEl.submitting).to.be.false;

            expect(submitButton).not.to.have.attribute('disabled');


        });

        it('emits request-success if the call succeeds', async () => {
            const informEl = await fixture(`
                <inform-el>
                <form action="${formUrl}" >
                    <inform-field>
                        <input type="text" name="field" required />
                    </inform-field>
                    <button type="submit">Submit</button>
                </form>
                    </inform-el>
                `);

            const submitButton = informEl.querySelector('[type="submit"]');
            const input = informEl.querySelector('input');

            const expectedResponse = { someField: 'someData' };

            await type(input, 'a', true);
            window.fetch.resolves({ json: () => Promise.resolve(expectedResponse), ok: true, status: 1234 });

            const [, requestSuccessDetails] = eventCheck(informEl, 'request-success');
            const [requestErrorCalled] = eventCheck(informEl, 'request-error');
            const [, requestEndDetails] = eventCheck(informEl, 'request-end');

            submitButton.click();
            await nextFrame();

            expect(requestSuccessDetails()).to.deep.include({ response: expectedResponse, status: 1234, values: { field: 'a' } });
            expect(requestErrorCalled()).to.be.false;
            expect(requestEndDetails()).to.deep.include({ values: { field: 'a' } });

        });
        it('emits request-error if the call fails', async () => {
            const informEl = await fixture(`
                <inform-el>
                <form action="${formUrl}" method="POST">
                    <inform-field>
                        <input type="text" name="field" required />
                    </inform-field>
                    <button type="submit">Submit</button>
                </form>
                    </inform-el>
                `);

            const submitButton = informEl.querySelector('[type="submit"]');
            const input = informEl.querySelector('input');

            const expectedResponse = { someField: 'someData' };

            await type(input, 'a', true);
            window.fetch.resolves({ json: () => Promise.resolve(expectedResponse), ok: false, status: 1234 });

            const [requestSuccessCalled] = eventCheck(informEl, 'request-success');
            const [, requestErrorDetails] = eventCheck(informEl, 'request-error');
            const [, requestEndDetails] = eventCheck(informEl, 'request-end');

            submitButton.click();
            await nextFrame();

            expect(requestErrorDetails()).to.deep.include({ response: expectedResponse, status: 1234, values: { field: 'a' } });
            expect(requestSuccessCalled()).to.be.false;
            expect(requestEndDetails()).to.deep.include({ values: { field: 'a' } });
        });

        it('emits request-error in case of exception', async () => {
            const informEl = await fixture(`
                <inform-el>
                <form action="${formUrl}" method="post">
                    <inform-field>
                        <input type="text" name="field" required />
                    </inform-field>
                    <button type="submit">Submit</button>
                </form>
                    </inform-el>
                `);

            const submitButton = informEl.querySelector('[type="submit"]');
            const input = informEl.querySelector('input');

            await type(input, 'a', true);
            const expectedError = new Error('some error');
            window.fetch.throws(expectedError);

            const [requestSuccessCalled] = eventCheck(informEl, 'request-success');
            const [, requestErrorDetails] = eventCheck(informEl, 'request-error');
            const [, requestEndDetails] = eventCheck(informEl, 'request-end');

            submitButton.click();
            await nextFrame();

            expect(requestErrorDetails()).to.deep.include({ error: expectedError, values: { field: 'a' } });
            expect(requestSuccessCalled()).to.be.false;
            expect(requestEndDetails()).to.deep.include({ values: { field: 'a' } });
        });

        it('considers submit-on-change on inform-field', async () => {
            const informEl = await fixture(`
                <inform-el>
                    <form action="${formUrl}"  method="post" >
                        <inform-field submit-on-change>
                            <input type="checkbox" name="field" />
                        </inform-field>
                    </form>
                    </inform-el>
                `);

            const checkbox = informEl.querySelector('input[type="checkbox"]');

            const [, requestStartDetails] = eventCheck(informEl, 'request-start');
            const [, requestEndDetails] = eventCheck(informEl, 'request-end');
            const [, submitDetails] = eventCheck(informEl, 'inform-submit');

            let resolveFetch;
            const fetchPromise = new Promise((resolve) => resolveFetch = resolve);
            window.fetch.returns(fetchPromise);

            expect(checkbox).not.to.have.attribute('disabled');

            checkbox.click();

            expect(window.fetch).to.have.been.calledWith(expectedUrl.toString(), {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ field: true })
            });

            expect(checkbox).to.have.attribute('disabled');

            expect(requestStartDetails()).to.deep.include({ values: { field: true } });
            expect(submitDetails()).to.deep.include({ values: { field: true }, submitter: checkbox });

            resolveFetch();
            await nextFrame();

            expect(requestEndDetails()).to.deep.include({ values: { field: true } });

            expect(checkbox).not.to.have.attribute('disabled');

        });


        it('transforms values if submitTransform is provided', async () => {

            const informEl = await fixture(`
                    <inform-el>
                        <form action="${formUrl}" method="POST">
                            <inform-field>
                                <input type="text" name="field" required/>
                            </inform-field>
                            <button type="submit">Submit</button>
                        </form>
                    </inform-el>
            `);

            informEl.submitTransform = (values) => {
                return {
                    field: values.field + ' transformed',
                    field2: values.field
                };
            };

            const submitButton = informEl.querySelector('[type="submit"]');
            const input = informEl.querySelector('input');

            const [, submitDetails] = eventCheck(informEl, 'inform-submit');
            const [, requestStartDetails] = eventCheck(informEl, 'request-start');
            const [, requestEndDetails] = eventCheck(informEl, 'request-end');

            await type(input, 'a', true);

            submitButton.click();

            expect(submitDetails()).to.deep.include({ values: { field: 'a' } });


            expect(window.fetch).to.have.been.calledWith(expectedUrl.toString(), {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ field: 'a transformed', field2: 'a' })
            });

            await nextFrame();


            expect(requestStartDetails()).to.deep.include({ values: { field: 'a transformed', field2: 'a' } });
            expect(requestEndDetails()).to.deep.include({ values: { field: 'a transformed', field2: 'a' } });
        });

        it('sends FormData if any value if of type File', async () => {
            const informEl = await fixture(`
                <inform-el>
                <form action="${formUrl}"  method="post">
                    <inform-field>
                        <input type="text" name="textfield" />
                    </inform-field>
                    <button type="submit">Submit</button>
                </form>
                </inform-el>
            `);

            const textInput = informEl.querySelector('input[type="text"]');
            const submitButton = informEl.querySelector('[type="submit"]');

            await type(textInput, 'a', true);

            const theFile = new File([], 'something');

            informEl.submitTransform = (values) => {
                return {
                    ...values,
                    field2: theFile
                };
            };
            submitButton.click();


            const callArgs = window.fetch.getCall(0).args;
            expect(callArgs[0]).to.equal(expectedUrl.toString());

            const { method, headers, body } = callArgs[1];

            expect(method).to.equal('post');
            expect(headers).to.deep.include({});

            expect(body).to.be.instanceOf(FormData);
            expect(body.get('textfield')).to.equal('a');
            expect(body.get('field2')).to.be.instanceOf(File);
            expect(body.get('field2').name).to.equal(theFile.name);
        });
    });

    it('submits when requestSubmit is called on form', async () => {
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field>
                            <input type="text" name="some-name" value="a"/>
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);

        const form = informEl.querySelector('form');
        const [submitHasBeenCalled, submitDetails] = eventCheck(informEl, 'inform-submit');

        if (typeof form.requestSubmit === 'function') {
            form.requestSubmit();
            await nextFrame();

            expect(submitHasBeenCalled()).to.be.true;
            expect(submitDetails()).to.deep.include({ values: { 'some-name': 'a' } });
        }
    });

    it('submits when requestSubmit is called on inform-el', async () => {
        const informEl = await fixture(`
                <inform-el>
                    <form>
                        <inform-field>
                            <input type="text" name="some-name" value="a"/>
                        </inform-field>
                        <button type="submit">Submit</button>
                    </form>
                </inform-el>
        `);

        const [submitHasBeenCalled, submitDetails] = eventCheck(informEl, 'inform-submit');

        informEl.requestSubmit();
        await nextFrame();

        expect(submitHasBeenCalled()).to.be.true;
        expect(submitDetails()).to.deep.include({ values: { 'some-name': 'a' } });
    });

    it('includes submitter in submit event details', async () => {
        const informEl = await fixture(`
        <inform-el>
            <form>
                <inform-field>
                    <input type="text" name="some-name" value="a" />
                </inform-field>
                <button type="submit">Submit</button>
            </form>
        </inform-el>
        `);

        const submitButton = informEl.querySelector('[type="submit"]');

        const [submitHasBeenCalled, submitDetails] = eventCheck(informEl, 'inform-submit');

        submitButton.click();
        await nextFrame();
        expect(submitHasBeenCalled()).to.be.true;
        expect(submitDetails()).to.deep.include({ values: { 'some-name': 'a' }, submitter: submitButton });
    });

    it('includes null submitter in submit event details if requestSubmit called on form', async () => {
        const informEl = await fixture(`
        <inform-el>
            <form>
                <inform-field>
                    <input type="text" name="some-name" value="a" />
                </inform-field>
                <button type="submit">Submit</button>
            </form>
        </inform-el>
        `);

        const form = informEl.querySelector('form');

        const [submitHasBeenCalled, submitDetails] = eventCheck(informEl, 'inform-submit');

        if (typeof form.requestSubmit === 'function') {
            form.requestSubmit();
            await nextFrame();
            expect(submitHasBeenCalled()).to.be.true;
            expect(submitDetails()).to.deep.include({ values: { 'some-name': 'a' }, submitter: null });
        }
    });

    it('includes null submitter in submit event details if requestSubmit called on inform-el', async () => {
        const informEl = await fixture(`
        <inform-el>
            <form>
                <inform-field>
                    <input type="text" name="some-name" value="a" />
                </inform-field>
                <button type="submit">Submit</button>
            </form>
        </inform-el>
        `);

        const [submitHasBeenCalled, submitDetails] = eventCheck(informEl, 'inform-submit');

        informEl.requestSubmit();
        await nextFrame();
        expect(submitHasBeenCalled()).to.be.true;
        expect(submitDetails()).to.deep.include({ values: { 'some-name': 'a' } });
    });

    it('focuses the first input on error when submitting', async () => {
        const informEl = await fixture(`
        <inform-el>
            <form>
                <fieldset>
                    <input type="text" name="some-name" value="a" />
                    <input type="text" name="some-name2" required />
                    <inform-field>
                        <input type="text" name="some-name3" required />
                    </inform-field>
                    <button type="submit">Submit</button>
                </fieldset>
            </form>
        </inform-el>
        `);

        const [submitHasBeenCalled, submitDetails] = eventCheck(informEl, 'inform-submit');
        const firstInvalidInput = informEl.querySelector('input[name="some-name2"]');

        informEl.requestSubmit();
        await nextFrame();
        expect(submitHasBeenCalled()).to.be.false;
        expect(firstInvalidInput.ownerDocument.activeElement).to.equal(firstInvalidInput);

    });

    it('focuses the first input with custom error when submitting', async () => {
        const informEl = await fixture(`
        <inform-el>
            <form>
                <fieldset>
                    <input type="text" name="some-name" value="a" />
                    <input type="text" name="some-name2" />
                    <inform-field>
                        <input type="text" name="some-name3" />
                    </inform-field>
                    <button type="submit">Submit</button>
                </fieldset>
            </form>
        </inform-el>
        `);

        const [submitHasBeenCalled, submitDetails] = eventCheck(informEl, 'inform-submit');
        const invalidInput = informEl.querySelector('input[name="some-name3"]');

        informEl.validationHandler = ({ values }) => {
            return {
                'some-name3': 'my custom error message'
            };
        };

        informEl.requestSubmit();
        await nextFrame();
        expect(submitHasBeenCalled()).to.be.false;
        expect(invalidInput.ownerDocument.activeElement).to.equal(invalidInput);

    });
});
