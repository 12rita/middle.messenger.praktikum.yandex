import { IProps } from '@shared/components';
import { TButtonType } from '@shared/types.ts';

export interface ITextButtonProps extends IProps {
    label?: string;
    type?: TButtonType;
    children?: string;
    onClick?: (event: Event) => void;
}
