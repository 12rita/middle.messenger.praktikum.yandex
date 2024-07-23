import { IProps } from '../../components';
import { IHistory } from '../../components/EventBus/types.ts';

export interface ISignInPage extends IProps {
    history: IHistory;
}
