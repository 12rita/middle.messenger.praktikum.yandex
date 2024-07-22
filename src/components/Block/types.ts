export enum EVENTS {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:render'
}

export interface IMeta {
    tagName: string;
    props: IProps;
}

export interface IEvent {
    [key: string]: (event: Event) => void;
}

export interface IProps {
    events?: IEvent;
    [key: string]: IBlock | IBlock[] | unknown;
}

export interface ICompileProps {
    [key: string]: IBlock | IBlock[] | unknown;
}

export type TGetContent = () => HTMLElement;

export interface IBlock {
    _element: HTMLElement;
    _meta: IMeta;
    props: IProps;
    _registerEvents: TVoid;
    _id: string;
    getContent: TGetContent;
}
export interface IChildren {
    [key: string]: IBlock | IBlock[];
}
