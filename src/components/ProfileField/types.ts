import { IProps } from '../Block';

export interface IProfileFieldProps extends IProps {
    title: string;
    key: string;
    type: TInputType;
    value: string | number;
    disabled: boolean;
    name: string;
}
