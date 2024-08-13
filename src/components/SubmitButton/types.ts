import { IProps } from '@shared/components';

export interface ISubmitButtonProps extends IProps {
    label?: string;
    children?: string;
    onClick: (event: Event) => void;
    disabled?: boolean;
    type?: 'submit';
    form?: string;
}
