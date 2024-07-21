import { IListeners, TEmit, TOff, TOn } from './types.ts';

export class EventBus<TProps> {
    private readonly listeners: IListeners<TProps>;
    constructor() {
        this.listeners = {};
    }

    on: TOn<TProps> = (event, callback) => {
        console.log('on', this.listeners, event);
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

    emit: TEmit<TProps> = (event, ...args) => {
        console.log('emit', this.listeners, event);
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach(function (listener) {
            listener(...args);
        });
    };
}
