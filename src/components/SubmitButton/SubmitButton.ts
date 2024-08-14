import styles from './styles.module.css';
import { ISubmitButtonProps } from './types.ts';
import { template } from './template.ts';
import { Block } from '@shared/components';

export class SubmitButton extends Block<ISubmitButtonProps> {
    constructor(props: ISubmitButtonProps) {
        super('button', {
            ...props,
            attributes: [
                ...(props.disabled
                    ? [{ name: 'disabled', value: 'true' }]
                    : []),
                ...(props.type ? [{ name: 'type', value: props.type }] : []),
                ...(props.form ? [{ name: 'form', value: props.form }] : [])
            ],
            className: props.className ?? [
                styles.submitButton,
                props.color ? styles[props.color] : styles.classic
            ],
            events: { click: props.onClick }
        });
    }

    componentDidUpdate(
        oldProps: ISubmitButtonProps,
        newProps: ISubmitButtonProps
    ) {
        console.log({ newProps });
        if (oldProps.disabled !== newProps.disabled) {
            this.setAttributes([
                {
                    name: 'disabled',
                    value: newProps.disabled ? 'true' : 'false',
                    remove: !newProps.disabled
                }
            ]);
            return true;
        } else return false;
    }

    render() {
        return this.compile(template, {
            children: this.props.label ?? this.props.children
        });
    }
}
