import { IProps } from '@shared/components';
import { TButtonType } from '@shared/types.ts';

export interface ISubmitButtonProps extends IProps {
    label?: string;
    children?: string;
    onClick: (event: Event) => void;
    disabled?: boolean;
    type?: 'submit';
    form?: string;
    color?: TButtonType;
}
