import { HTTPTransport, api } from './HTTPTransport';
import { expect } from 'chai';
import {
    SinonFakeXMLHttpRequest,
    SinonFakeXMLHttpRequestStatic,
    spy,
    useFakeXMLHttpRequest
} from 'sinon';
import 'ignore-styles';

describe('HTTPTransport', () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let requests: SinonFakeXMLHttpRequest[];

    beforeEach(() => {
        xhr = useFakeXMLHttpRequest();
        // @ts-ignore
        global.XMLHttpRequest = xhr;
        // @ts-ignore
        global.window.XMLHttpRequest = xhr;
        requests = [];
        xhr.onCreate = xhrObj => {
            requests.push(xhrObj);
        };
    });

    afterEach(() => {
        xhr.restore();
    });

    it('should create a new HTTPTransport instance', () => {
        const transport = new HTTPTransport();
        expect(transport).to.be.an.instanceof(HTTPTransport);
    });

    it('should have get, put, post, and delete methods', () => {
        expect(api.get).to.be.a('function');
        expect(api.put).to.be.a('function');
        expect(api.post).to.be.a('function');
        expect(api.delete).to.be.a('function');
    });

    it('should call request method with correct options', () => {
        const spyFunc = spy(api, 'request');
        const url = 'https://example.com/api/data';
        api.get(url);
        expect(
            spyFunc.calledWith(url, {
                method: 'GET'
            })
        ).to.be.true;
    });

    it('should call request method with correct headers', () => {
        const url = 'https://example.com/api/data';

        api.get(url);

        expect(requests[0].requestHeaders).to.deep.include({
            accept: 'application/json',
            'content-type': 'application/json;charset=utf-8'
        });
    });

    it('should make a POST request with data', () => {
        const url = 'https://example.com/api/data';
        const data = { foo: 'bar' };

        api.post(url, { data });

        expect(requests[0].requestBody).to.be.deep.equal({ foo: 'bar' });
    });

    it('should call an error function', () => {
        const url = 'https://example.com/api/data/error';
        const data = { foo: 'bar' };
        const errorFunc = (e: { text: string }) => {
            console.log(e);
        };
        const spyErrorFunc = spy(errorFunc);

        api.post(url, { data, onError: errorFunc }).catch(() => {
            expect(spyErrorFunc.calledOnce).to.be.true;
        });
    });
});
