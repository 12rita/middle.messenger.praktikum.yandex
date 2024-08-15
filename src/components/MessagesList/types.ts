import { IProps } from '@shared/components';
import { IMessage } from '@shared/types.ts';

export interface IMessagesListProps extends IProps {
    id: number;
    messages?: IMessage[];
}

export interface IRenderProps {
    messages?: IMessage[];
    lastMessage?: IMessage;
}
