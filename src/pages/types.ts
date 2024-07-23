import { IProps } from '../components';
import { IEventBus } from '../components/EventBus/types.ts';

export interface IHistory extends IEventBus {}

export interface IPage extends IProps {
    history: IHistory;
}
