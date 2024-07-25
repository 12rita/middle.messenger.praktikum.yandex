import { IFileUploaderProps } from './types.ts';
import { Block, EVENTS } from '../../shared';
import { template } from './template.ts';
import noPicture from '../../static/noPicture.svg';

const defaultAvatar = `<img alt="noPicture" src="${noPicture}">`;

export class FileUploader extends Block<IFileUploaderProps> {
    activeTemplate;
    constructor(props: IFileUploaderProps) {
        super('div', props);
        this.activeTemplate = defaultAvatar;
        this.on('edit', this._setEditable.bind(this));
        this.on('save', this._saveData.bind(this));
    }

    _setEditable() {
        this.activeTemplate = template;
        this.emit(EVENTS.FLOW_CDU);
    }

    _saveData() {
        this.activeTemplate = defaultAvatar;
        this.emit(EVENTS.FLOW_CDU);
    }

    componentDidUpdate() {
        return true;
    }

    render() {
        return this.compile(this.activeTemplate ?? defaultAvatar, {
            label: this.props.label ?? 'Поменять аватар'
        });
    }
}
