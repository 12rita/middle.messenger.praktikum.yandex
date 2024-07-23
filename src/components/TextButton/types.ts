import { IProps } from '../Block';

type TButtonType = 'classic' | 'gray' | 'danger';

export interface ITextButtonProps extends IProps {
    label?: string;
    type?: TButtonType;
    children?: string;
    onClick?: (event: Event) => void;
}
