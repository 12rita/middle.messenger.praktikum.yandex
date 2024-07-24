import { IBlock, IFormField, IFormValues, IProps, IValues } from '../../shared';
import { IProfileFieldProps } from '../ProfileField/types.ts';

export interface IProfileForm extends IBlock<IProfileFormProps> {
    values: IFormValues;
}
export type THandleChange = (props: IValues) => void;

export interface IProfileFormProps extends IProps, Partial<IProfileFieldProps> {
    id: string;
    name: string;
    formFields: IFormField[];
}
