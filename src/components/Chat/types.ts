import { IProps } from '@shared/components';

interface IMessage {
    content: string;
    time: string;
}

export interface IChatProps extends IProps {
    title?: string;
    id: number;
    messages?: IMessage[];
    indicator?: number;
    onSend: (value: string) => void;
}

export interface IRenderProps {
    messages?: IMessage[];
    lastMessage?: IMessage;
}
