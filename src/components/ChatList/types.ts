import { IProps } from '@shared/components';
import { IChatPreview } from '@shared/types.ts';

export interface IChatListProps extends IProps {
    onChatClick: (id: number) => void;
    chatsData: IChatPreview[];
}
