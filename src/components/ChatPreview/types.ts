import { IProps } from '../Block';

export interface IChatPreviewProps extends IProps {
    id: string;
    title: string;
    message: string;
    time: string;
    indicator: number;
}
