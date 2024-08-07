import { Router } from './router.ts';
import { IProps } from '../Block';
import { Pages } from './pages.ts';

export enum PAGES {
    signIn = '/sign-in',
    signUp = '/sign-up',
    profile = '/settings',
    page404 = '/404',
    page500 = '/500',
    chats = '/messenger',
    changePassword = '/changePassword'
}

export type TPages = {
    [K in keyof typeof PAGES]: (typeof PAGES)[K];
}[keyof typeof PAGES];

export type TPageBlock = (typeof Pages)[keyof typeof Pages];

export interface IPage extends Partial<IProps> {
    history: Router;
}
