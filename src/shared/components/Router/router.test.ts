import { Router } from './router.ts';
import { expect } from 'chai';
import { TPageBlock, TPages } from '@shared/components';

describe('Router', () => {
    let router: Router;
    let TestBlock: TPageBlock;

    beforeEach(() => {
        router = new Router('root-query');
        class TestComponent {
            constructor() {}
        }
        TestBlock = TestComponent as unknown as TPageBlock;
    });

    it('should create a new instance', () => {
        expect(router).to.be.an.instanceof(Router);
    });

    it('should have an empty routes array', () => {
        expect(router.routes).to.have.lengthOf(0);
    });

    it('should add a new route', () => {
        router.use('/test' as TPages, TestBlock);
        expect(router.routes).to.have.lengthOf(1);
    });

    it('should get a route by pathname', () => {
        router.use('/test' as TPages, TestBlock);
        const route = router.getRoute('/test');
        expect(route).to.exist;
    });

    it('should navigate to a route', () => {
        router.use('/test' as TPages, TestBlock);
        router.go('/test');
        expect(router._currentRoute?._pathname).to.be.equal('/test');
    });
});
