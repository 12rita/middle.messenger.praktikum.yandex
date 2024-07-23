import { EventBus } from '../EventBus';
import {
    IBlock,
    IMeta,
    EVENTS,
    IChildren,
    TGetContent,
    IProps,
    ICompileProps
} from './types.ts';
import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import { deepClone } from '../../utils';

export class Block<
        IBlockProps extends IProps = IProps,
        CompileProps extends ICompileProps = ICompileProps
    >
    extends EventBus<IBlockProps>
    implements IBlock
{
    _element = {} as HTMLElement;
    _meta = {} as IMeta;
    props: IBlockProps;
    children: IChildren = {};
    _parent: IBlock | null = null;
    _id;

    constructor(tagName = 'div', propsAndChildren = {} as IBlockProps) {
        super();
        const { children, props } = this._getChildren(propsAndChildren);

        this.children = children;
        this._id = makeUUID();
        this._meta = {
            tagName,
            props
        };

        this.props = this._makePropsProxy({
            ...props,
            __id: this._id
        });

        this._registerEvents();
        this.emit(EVENTS.INIT);
    }

    _getChildren(propsAndChildren: IBlockProps) {
        const children = {} as IChildren;
        const props: { [key: string]: unknown } = {};
        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (Array.isArray(value) && value[0] instanceof Block) {
                children[key] = value as unknown as IBlock;
                value.forEach(entry => {
                    entry._parent = this;
                });
            }
            if (value instanceof Block) {
                children[key] = value;
                value._parent = this;
            } else {
                props[key] = value;
            }
        });

        return { children, props: props as IBlockProps };
    }

    compile(template: string, props: CompileProps) {
        const propsAndStubs: { [key: string]: unknown | unknown[] } =
            deepClone(props);

        Object.entries(this.children).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                child.forEach((grandChild, idx) => {
                    if (!Array.isArray(propsAndStubs[key]))
                        propsAndStubs[key] = [];
                    (propsAndStubs[key] as string[])[idx] =
                        `<div data-id="${grandChild._id}"></div>`;
                });
            } else propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });
        const fragment = this._createDocumentElement(
            'template'
        ) as HTMLTemplateElement;

        fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

        Object.values(this.children).forEach(child => {
            if (Array.isArray(child)) {
                child.forEach(grandChild => {
                    const stub = fragment.content.querySelector(
                        `[data-id="${grandChild._id}"]`
                    );

                    if (stub) stub.replaceWith(grandChild.getContent());
                });
            } else {
                const stub = fragment.content.querySelector(
                    `[data-id="${child._id}"]`
                );
                if (stub) stub.replaceWith(child.getContent());
            }
        });

        return fragment.content as unknown as HTMLElement;
    }

    _registerEvents() {
        this.on(EVENTS.INIT, this.init.bind(this));
        this.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        this.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _removeEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach(eventName => {
            this._element.removeEventListener(eventName, events[eventName]);
        });
    }

    _addEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach(eventName => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();

        this.emit(EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount();

        Object.values(this.children).forEach(child => {
            if (Array.isArray(child))
                child.forEach(grandChild => {
                    grandChild.dispatchComponentDidMount;
                });
            else child.dispatchComponentDidMount();
        });
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this.emit(EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }

        this._render();
    }

    componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps) {
        const isEqual =
            typeof oldProps === 'object'
                ? Object.keys(oldProps).every(key => {
                      return oldProps[key] === newProps[key];
                  }) &&
                  Object.keys(oldProps).length === Object.keys(newProps).length
                : oldProps === newProps;
        return !isEqual;
    }

    setProps = (nextProps: IBlockProps) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        const block = this.render();

        this._removeEvents();
        this._element.innerHTML = '';
        this._element.appendChild(block);

        this._addEvents();
    }

    render(): HTMLElement {
        return {} as HTMLElement;
    }

    getContent: TGetContent = () => {
        return this.element;
    };

    _makePropsProxy(props: IBlockProps) {
        return new Proxy(props, {
            get: (target, prop) => {
                const value = target[prop as string];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set: (target, prop, value) => {
                const oldObj = deepClone(target) as IBlockProps;
                (target as { [key: string]: unknown })[prop as string] = value;
                this.emit(EVENTS.FLOW_CDU, oldObj, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }

    _createDocumentElement(tagName: string) {
        const element = document.createElement(tagName);
        element.setAttribute('data-id', this._id);
        const className = this.props.className || '';
        if (className) element.classList.add(className);
        return element;
    }
}
