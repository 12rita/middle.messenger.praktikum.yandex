import { IProps } from '../../shared';

export interface ISubmitButtonProps extends IProps {
    label?: string;
    children?: string;
    onClick: (event: Event) => void;
}
