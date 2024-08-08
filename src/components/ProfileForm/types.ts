import { IProfileFieldProps } from '../ProfileField/types.ts';
import { IBlock, IProps } from '@shared/components';
import {
    IFormField,
    IFormValues,
    IValues,
    TChangePasswordFields,
    TSettingsFields
} from '@shared/types.ts';

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
