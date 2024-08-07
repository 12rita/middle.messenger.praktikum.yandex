import { IProps } from '@shared/components';

type TToaster = 'error' | 'success';
export interface IToasterProps extends IProps {
    text: string;
    type: TToaster;
}
