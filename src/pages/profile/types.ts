import { IBlock, ICompileProps } from '../../shared';

export interface IProfile {
    buttonBlock: IBlock;
}

export interface IProfileProps extends ICompileProps {
    form: IBlock;
    backButton: IBlock;
    avatar: IBlock;
    buttonBlock: IBlock;
}
