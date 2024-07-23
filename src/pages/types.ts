import { IProps } from '../components';
import { IEventBus } from '../components/EventBus/types.ts';

export enum PAGES {
    signIn = '/signIn',
    signUp = '/signUp',
    profile = '/profile',
    page404 = '/404',
    page500 = '/500',
    chats = '/chats',
    changePassword = '/changePassword'
}

export interface IHistory extends IEventBus {}

export interface IPage extends IProps {
    history: IHistory;
}
