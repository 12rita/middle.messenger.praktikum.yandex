import { IProps } from '@shared/components';

interface IMessage {
    message: string;
    time: string;
}

export interface IChatProps extends IProps {
    title: string;
    messages: IMessage[];
    indicator: number;
    onSend: (value: string) => void;
}
