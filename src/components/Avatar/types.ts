import { IProps } from '@shared/components';

export interface IFileUploaderProps extends IProps {
    label?: string;
    src?: string;
    wrapperClassname?: string;
    imageClassname?: string;
    hasIcon?: boolean;
}
