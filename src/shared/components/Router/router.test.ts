import { Router } from './router.ts';
import { expect } from 'chai';

describe('Router', () => {
    let router: Router;

    beforeEach(() => {
        router = new Router('root-query');
    });

    it('should initialize routes', () => {
        expect(router.routes).to.be.an('array');
        expect(router.routes.length).to.be.above(0);
    });
});
