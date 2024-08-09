import { IProps } from '@shared/components';

export interface INewChatProps extends IProps {
    addChatClass?: string;
    onClose?: (event?: Event) => void;
}

export interface IAddButtonProps extends IProps {
    onClick: TVoid;
}
