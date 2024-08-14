import { IProps } from '@shared/components';

export interface IChatProps extends IProps {
    title?: string;
    id: number;
    indicator?: number;
    avatar?: string;
}
