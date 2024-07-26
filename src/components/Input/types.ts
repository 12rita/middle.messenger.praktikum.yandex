import { IProps, TFieldName } from '../../shared';

export interface IInputProps extends IProps {
    onBlur?: (e: Event) => void;
    disabled?: boolean;
    type: TInputType;
    name: TFieldName;
    placeholder?: string;
    value?: string;
    errorClassName?: string;
}
