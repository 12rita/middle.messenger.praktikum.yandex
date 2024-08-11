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

export interface IUser {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
    avatar: string;
    email: string;
}

export interface IMessage {
    user: IUser;
    time: string;
    content: string;
}

export interface IChatPreview {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by: number;
    last_message: IMessage;
}
