import { IChatPreview, IMessage } from '@shared/types.ts';

export interface IState {
    chatsPreview: IChatPreview[];
    chats: {
        preview: {
            data: IChatPreview[];
        };
        messages: IMessage[];
    };
}

export interface IApiData {
    data: IChatPreview[];
}
