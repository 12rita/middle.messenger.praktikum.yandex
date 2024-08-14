import { IProps } from '@shared/components';

type TToaster = 'Error' | 'Success';
export interface IToasterProps extends IProps {
    text: string;
    type?: TToaster;
    title?: string;
}
