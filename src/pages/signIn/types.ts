import { IProps } from '../../shared';
import { IHistory } from '../../shared/components/EventBus/types.ts';

export interface ISignInPage extends IProps {
    history: IHistory;
}
