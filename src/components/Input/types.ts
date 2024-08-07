import { IProps } from '@shared/components';
import { TFieldName } from '@shared/types.ts';

export interface IInputProps extends IProps {
    onBlur?: (e: Event) => void;
    disabled?: boolean;
    type: TInputType;
    name: TFieldName;
    placeholder?: string;
    value?: string;
    errorClassName?: string;
}
