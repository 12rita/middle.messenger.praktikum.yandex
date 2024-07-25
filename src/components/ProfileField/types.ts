import { IProps } from '../../shared';
import { IInputProps } from '../Input';

export interface IProfileFieldProps extends IProps, IInputProps {
    title: string;
    key: string;
}
