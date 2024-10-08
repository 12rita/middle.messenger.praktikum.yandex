export type TOn<T = unknown> = (event: string, callback: TCallback<T>) => void;
export type TCallback<T> = (...args: T[]) => unknown;
export type TEmit<T> = (event: string, ...args: T[]) => void;

export type TOff = TOn;
export interface IEventBus<T = unknown> {
    on: TOn<T>;
    off: TOff;
    emit: TEmit<T>;
}

export interface IListeners<T = unknown> {
    [key: string]: Array<(...args: T[]) => unknown>;
}
