import { IInputProps } from '../Input';
import { IProps } from '@shared/components';

export interface IFormInputProps extends IProps, IInputProps {
    type: TInputType;
    placeholder: string;
}
