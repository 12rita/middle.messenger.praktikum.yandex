import { IProps } from '@shared/components';

export interface INewChatProps extends IProps {
    addChatClass?: string;
    onClick?: (event) => void;
}

export interface IAddButtonProps extends IProps {
    onClick: TVoid;
}
