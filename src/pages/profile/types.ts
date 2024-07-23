import { IBlock, ICompileProps } from '../../components';

export interface IProfileProps extends ICompileProps {
    form: IBlock;
    textButtonChangeData: IBlock;
    textButtonChangePassword: IBlock;
    textButtonExit: IBlock;
}
