import { IEventBus } from '../EventBus/types.ts';

export enum EVENTS {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:render'
}

export interface IEvent {
    [key: string]: (event: Event) => void;
}

export interface IBlock<T = IProps> extends IEventBus<T> {
    _element: HTMLElement;
    _meta: IMeta;
    props: IProps;
    _registerEvents: TVoid;
    _id: string;
    getContent: TGetContent;
    dispatchComponentDidMount: TVoid;
    setProps: TSetProps;
}

export interface ICompileProps {
    [key: string]: IBlock | IBlock[] | unknown;
}

export interface IAttribute {
    name: string;
    value: string;
    remove?: boolean;
}

export interface IProps extends Partial<IEventBus> {
    events?: IEvent;
    className?: string | string[];
    attributes?: IAttribute[];
    [key: string]: IBlock | IBlock[] | unknown;
}

export interface IMeta {
    tagName: string;
    props: IProps;
}

export type TGetContent = () => HTMLElement;

export type TSetProps<T = IProps> = (props: T) => void;

export interface IChildren {
    [key: string]: IBlock | IBlock[];
}
