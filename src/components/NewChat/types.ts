import { IProps } from '@shared/components';
import { IUser } from '@shared/types.ts';

export interface INewChatProps extends IProps {
    addChatClass?: string;
    onClose?: (event?: Event) => void;
    edit?: boolean;
    chatId?: number;
    title?: string;
}

export interface IAddButtonProps extends IProps {
    onClick: TVoid;
}

export interface IState {
    users: IUser[];
    existedUsers: IUser[];
}
