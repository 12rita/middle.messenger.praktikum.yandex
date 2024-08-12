import { IProfileFieldProps } from './types.ts';

import { template } from './template.ts';

import styles from './styles.module.css';
import { Input } from '../Input';
import global from '../../globalStyles.module.css';
import { Block, EVENTS } from '@shared/components';
import { isEqual, isValidField } from '@shared/utils';
import { TFieldName } from '@shared/types.ts';

export class ProfileField extends Block<IProfileFieldProps> {
    constructor(props: IProfileFieldProps) {
        const input = new Input({
            ...props,
            className: [styles.fieldValue, global.grayText, global.body1],
            disabled: props.disabled,
            onBlur: e => {
                checkIsValid(e);
            }
        });
        super('div', { ...props, input });
        const checkIsValid = (e: Event) => {
            this._checkIsValid(e);
        };
    }

    _checkIsValid = (e: Event) => {
        const { message } = isValidField({
            name: this.props.name as TFieldName,
            value: (e.target as HTMLInputElement)?.value
        });
        this.props.error = message;
        this.props.hasError = message ? 'errorVisible' : '';
        this.emit(EVENTS.FLOW_CDU);
    };

    componentDidUpdate(
        oldProps: IProfileFieldProps,
        newProps: IProfileFieldProps
    ) {
        console.log({ newProps, oldProps, input: this.children.input });
        if (!isEqual(oldProps, newProps)) {
            (this.children.input as unknown as Input).setProps({
                value: (this.children.input as unknown as Input).value,
                disabled: this.props.disabled
            });
            return true;
        }
        // this.children.input = new Input({
        //     ...this.props,
        //     value: (this.children.input as unknown as Input).value,
        //     disabled: this.props.disabled,
        //     className: [styles.fieldValue, global.grayText, global.body1],
        //     onBlur: e => {
        //         this._checkIsValid(e);
        //     }
        // }) as unknown as IBlock;
        return false;
    }

    render() {
        return this.compile(template, {
            ...this.props,
            error: this.props.error,
            hasError: this.props.hasError ? styles.errorVisible : '',
            input: this.children.input
        });
    }
}
