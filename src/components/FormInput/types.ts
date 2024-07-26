import { IProps } from '../../shared';
import { IInputProps } from '../Input';

export interface IFormInputProps extends IProps, IInputProps {
    type: TInputType;
    placeholder: string;
}
