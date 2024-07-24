import { IProps } from '../../shared';

export interface IInputProps extends IProps {
    type: TInputType;
    name: string;
    placeholder: string;
}
