import Handlebars from 'handlebars';
import './styles.css';
import { ITextButtonProps } from './types.ts';

export default Handlebars.compile<ITextButtonProps>(
    `<button class="textButton" id="{{id}}">{{label}}</button>`
);
