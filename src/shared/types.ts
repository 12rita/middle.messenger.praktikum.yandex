import { IProps } from './components';
import { IEventBus } from './components/EventBus/types.ts';
import { user, userPassword } from './const.ts';

export enum PAGES {
    signIn = '/signIn',
    signUp = '/signUp',
    profile = '/profile',
    page404 = '/404',
    page500 = '/500',
    chats = '/chats',
    changePassword = '/changePassword'
}

export type TPages = {
    [K in keyof typeof PAGES]: (typeof PAGES)[K];
}[keyof typeof PAGES];

export interface IHistory extends IEventBus {}

export interface IPage extends Partial<IProps> {
    history: IHistory;
}

export interface IFormFields {
    title: string;
    name?: keyof typeof user | keyof typeof userPassword;
    value: string;
    type?: TInputType;
    disabled?: boolean;
}

export interface IFormField {
    title: string;
    name: keyof typeof user | keyof typeof userPassword;
    value: string | number;
    disabled?: boolean;
}

export interface IFormValues {
    [key: string]: string | number;
}

export interface IValues {
    name: string;
    value: string | number;
}
