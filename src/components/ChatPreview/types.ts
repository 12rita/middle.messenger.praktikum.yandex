import { IProps } from '../../shared';

export interface IChatPreviewProps extends IProps {
    title: string;
    message: string;
    time: string;
    indicator: number;
}
