import { IProps, TChangePasswordFields, TSettingsFields } from '../../shared';

export interface IProfileFieldProps extends IProps {
    title: string;
    key: string;
    type: TInputType;
    value: string;
    disabled: boolean;
    name: TSettingsFields | TChangePasswordFields;
}

export interface IInnerInputProps extends IProps, IProfileFieldProps {
    onBlur: (e: Event) => void;
    disabled: boolean;
}

export interface IInnerInput {
    value: string;
}
