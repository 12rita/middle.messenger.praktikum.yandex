import { IProps } from '@shared/components';
import { IUser } from '@shared/types.ts';

export interface IUserListProps extends IProps {
    users: IUser[];
}

export interface IExistedUserListProps extends IProps {
    id: number;
}

export interface IUserItemProps extends IProps {
    user: IUser;
    onClick: TVoid;
    active?: boolean;
}
