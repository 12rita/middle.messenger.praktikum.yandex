import { IProps } from '@shared/components';

export interface ITextButtonProps extends IProps {
    label?: string;
    type?: TButtonType;
    children?: string;
    onClick?: (event: Event) => void;
}
