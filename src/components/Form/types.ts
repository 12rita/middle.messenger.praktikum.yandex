import {
    IBlock,
    ICompileProps,
    IFormField,
    IFormValues,
    IProps,
    IValues,
    TSignInFields,
    TSignUpFields
} from '../../shared';
import { ITextButtonProps } from '../TextButton/types.ts';
import { ISubmitButtonProps } from '../SubmitButton/types.ts';

export interface IForm extends IBlock<IFormProps> {
    values: IFormValues;
}

export type THandleChange = (props: IValues) => void;

type TFormSize = 'small' | 'big';

export interface IFormProps
    extends IProps,
        Omit<ITextButtonProps, 'onClick'>,
        Omit<ISubmitButtonProps, 'onClick'> {
    textButtonLabel: string;
    submitButtonLabel: string;
    onSubmitClick: (values: IFormValues) => void;
    onTextClick: TVoid;
    formFields: IFormField<TSignUpFields | TSignInFields>[];
    size: TFormSize;
    id: string;
    name: string;
    title: string;
}

export interface IFormCompileProps extends ICompileProps {
    inputs: IBlock[];
    submitButton: IBlock;
    textButton: IBlock;
    id: string;
    name: string;
}
