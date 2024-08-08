import { IInputProps } from '../Input';
import { IProps } from '@shared/components';

export interface IProfileFieldProps extends IProps, IInputProps {
    title: string;
    key: string;
}
