import { IProps } from '@shared/components';
import { IMessage } from '@shared/types.ts';

export interface IChatPreviewProps extends IProps {
    title: string;
    last_message: IMessage;
    unread_count: number;
    avatar?: string;
}
