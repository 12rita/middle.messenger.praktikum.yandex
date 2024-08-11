import { IProps } from '@shared/components';
import { IUser } from '@shared/types.ts';

export interface INewChatProps extends IProps {
    addChatClass?: string;
    onClose?: (event?: Event) => void;
}

export interface IAddButtonProps extends IProps {
    onClick: TVoid;
}

export interface IState {
    users: IUser[];
}
