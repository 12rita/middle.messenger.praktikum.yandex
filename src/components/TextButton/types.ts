import { IProps } from '../Block';

export interface ITextButtonProps extends IProps {
    label: string;
    onClick?: (event: Event) => void;
}
