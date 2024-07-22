import { IProps } from '../Block';
import { ITextButtonProps } from '../TextButton/types.ts';

export interface IErrorProps extends IProps, ITextButtonProps {
    errorCode: number;
    errorText: string;
}
