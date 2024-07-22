import { IProps } from '../Block';

export interface ITextButtonProps extends IProps {
    id: string;
    label: string;
    onClick?: (event: Event) => void;
}
