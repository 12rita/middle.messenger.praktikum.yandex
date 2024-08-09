import { IProps } from '@shared/components';
import { IUser } from '@shared/types.ts';

export interface IUserListProps extends IProps {
    users: IUser[];
}

export interface IUserItemProps extends IProps {
    user: IUser;
    onClick: TVoid;
}
