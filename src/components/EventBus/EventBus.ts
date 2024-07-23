import { IEventBus, IListeners, TEmit, TOff, TOn } from './types.ts';

export class EventBus<TProps> implements IEventBus<TProps> {
    private readonly listeners: IListeners<TProps>;
    constructor() {
        this.listeners = {};
    }

    on: TOn<TProps> = (event, callback) => {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    };

    off: TOff = (event, callback) => {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    };

    offAll: TVoid = () => {
        Object.keys(this.listeners).forEach(listener => {
            delete this.listeners[listener];
        });
    };

    emit: TEmit<TProps> = (event, ...args) => {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach(function (listener) {
            listener(...args);
        });
    };
}
