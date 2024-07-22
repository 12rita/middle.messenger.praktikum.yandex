import { IBlock, ICompileProps, IProps } from '../Block';
import { ITextButtonProps } from '../TextButton/types.ts';

interface IFormFields {
    title: string;
    value: string;
    type?: TInputType;
}

export interface IFormProps extends IProps, ITextButtonProps {
    formFields: IFormFields[];
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
