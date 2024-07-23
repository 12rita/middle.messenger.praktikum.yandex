import { IProps } from '../Block';
import { IProfileFieldProps } from '../ProfileField/types.ts';
import { user } from '../../const.ts';

export interface IFormField {
    title: string;
    name: keyof typeof user;
    value: string | number;
}

export interface IProfileFormProps extends IProps, Partial<IProfileFieldProps> {
    id: string;
    name: string;
    formFields: IFormField[];
}
