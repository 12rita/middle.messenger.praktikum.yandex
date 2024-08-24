import { Block } from './Block';
import { expect } from 'chai';
import { spy } from 'sinon';

describe('Block', () => {
    it('should create a new block instance', () => {
        const block = new Block('div');
        expect(block).to.be.an.instanceof(Block);
    });

    it('should set props correctly', () => {
        const block = new Block('div', { foo: 'bar' });
        block.setProps({ foo: 'baz' });
        expect(block.props).to.deep.equal({ foo: 'baz', __id: block._id });
    });

    it('should call componentDidUpdate once', () => {
        const block = new Block('div', { foo: 'bar' });

        const spyFunc = spy(block, 'componentDidUpdate');
        block.setProps({ foo: 'baz', bar: 'baz' });

        expect(spyFunc.calledOnce).to.be.true;
    });

    it('should set attributes correctly', () => {
        const block = new Block('div', { foo: 'bar' });
        block.setAttributes([{ name: 'data-foo', value: 'bar' }]);
        expect(block.element.getAttribute('data-foo')).to.equal('bar');
    });

    it('should set children correctly', () => {
        const block = new Block('div', { foo: 'bar' });
        block.setChildren({ baz: new Block('span') });
        expect(block.children).to.deep.equal({ baz: block.children.baz });
    });
});
