import { IProps } from '../Block';

export interface IInputProps extends IProps {
    type: TInputType;
    name: string;
    placeholder: string;
}
