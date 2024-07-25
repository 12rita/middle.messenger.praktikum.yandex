import {
    IBlock,
    IFormField,
    IFormValues,
    IProps,
    IValues,
    TChangePasswordFields,
    TSettingsFields
} from '../../shared';
import { IProfileFieldProps } from '../ProfileField/types.ts';

export interface IProfileForm extends IBlock<IProfileFormProps> {
    values: IFormValues;
}
export type THandleChange = (props: IValues) => void;

export interface IProfileFormProps extends IProps, Partial<IProfileFieldProps> {
    id: string;
    key: string;
    formFields: IFormField<TSettingsFields | TChangePasswordFields>[];
    handleSubmit: (values: IFormValues) => void;
}
