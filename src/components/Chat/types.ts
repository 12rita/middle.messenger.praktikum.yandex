import { IProps } from '../../shared';

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
