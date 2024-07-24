import { IProps } from '../../shared';
import { ITextButtonProps } from '../TextButton/types.ts';

export interface IErrorProps extends IProps, ITextButtonProps {
    errorCode: number;
    errorText: string;
}
