import { ITextButtonProps } from '../TextButton/types.ts';
import { IProps } from '@shared/components';

export interface IErrorProps extends IProps, ITextButtonProps {
    errorCode: number;
    errorText: string;
}
