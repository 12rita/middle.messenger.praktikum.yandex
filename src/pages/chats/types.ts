import { IChatPreview } from '@shared/types.ts';

export interface IState {
    chats: IChatPreview[];
}

export interface IApiData {
    data: IChatPreview[];
}
