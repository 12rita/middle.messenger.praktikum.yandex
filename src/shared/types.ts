export type TSignUpFields =
    | 'email'
    | 'password'
    | 'first_name'
    | 'second_name'
    | 'login'
    | 'phone';
export type TSignInFields = 'login' | 'password';
export type TSettingsFields =
    | 'email'
    | 'first_name'
    | 'second_name'
    | 'display_name'
    | 'phone';
export type TChangePasswordFields = 'oldPassword' | 'newPassword';

export type TMessageField = 'message';

export type TFieldName =
    | TSignUpFields
    | TSignInFields
    | TSettingsFields
    | TChangePasswordFields
    | TMessageField;

export interface IFormField<T> {
    title: string;
    name: T;
    value: string;
    type?: TInputType;
    disabled?: boolean;
}

export interface IFormValues {
    [key: string]: string | number;
}

export interface IValues {
    name: string;
    value: string | number;
}
