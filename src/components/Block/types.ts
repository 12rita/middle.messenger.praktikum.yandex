export enum EVENTS {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:render'
}

export type TRegisterEventsPrivate = TVoid;

export interface IMeta {
    tagName: string;
    props: TProps;
}

export type TProps = Record<string, unknown>;
export type TComponentDidUpdate = (oldProps: TProps, newProps: TProps) => void;

export interface IBlock {
    _element: HTMLElement | null;
    _meta: IMeta;
    props: TProps;
    _registerEvents: TVoid;
}
