import { ITextButtonProps } from '../TextButton/types.ts';

export interface IErrorProps extends ITextButtonProps {
    errorCode: number;
    errorText: string;
}
