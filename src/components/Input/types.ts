import { IProps, TFieldName } from '../../shared';

export interface IInputProps extends IProps {
    type: TInputType;
    name: TFieldName;
    placeholder: string;
}

export interface IInnerInputProps extends IProps, IInputProps {
    onBlur: (e: Event) => void;
}
