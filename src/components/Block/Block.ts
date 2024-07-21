import { EventBus } from '../EventBus';
import { IBlock, IMeta, TProps, EVENTS } from './types.ts';

export class Block extends EventBus<TProps> implements IBlock {
    _element = null;
    _meta = {} as IMeta;
    props: TProps;

    constructor(tagName = 'div', props = {}) {
        super();

        this._meta = {
            tagName,
            props
        };

        this.props = this._makePropsProxy(props);

        this._registerEvents();
        this.emit(EVENTS.INIT);
    }

    _registerEvents() {
        this.on(EVENTS.INIT, this.init.bind(this));
        this.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        this.on(EVENTS.FLOW_RENDER, this._render.bind(this));
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
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this.emit(EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: TProps, newProps: TProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps: TProps, newProps: TProps) {
        const isEqual =
            typeof oldProps === 'object'
                ? Object.keys(oldProps).every(key => {
                      return oldProps[key] === newProps[key];
                  }) &&
                  Object.keys(oldProps).length === Object.keys(newProps).length
                : oldProps === newProps;
        return !isEqual;
    }

    setProps = (nextProps: TProps) => {
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

        this._element.innerHTML = block;
    }

    render() {}

    getContent(): HTMLElement | null {
        return this.element;
    }

    _makePropsProxy(props: TProps) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+

        return new Proxy(props, {
            get: (target, prop) => {
                const value = target[prop as string];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set: (target, prop, value) => {
                target[prop as string] = value;

                // Запускаем обновление компоненты
                // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
                this.emit(EVENTS.FLOW_CDU, { ...target }, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }
}
