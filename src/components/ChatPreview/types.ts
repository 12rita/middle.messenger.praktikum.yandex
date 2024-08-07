import { IProps } from '@shared/components';

export interface IChatPreviewProps extends IProps {
    title: string;
    message: string;
    time: string;
    indicator: number;
}
