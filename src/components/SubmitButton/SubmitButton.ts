import Handlebars from 'handlebars';
import './styles.css';
import { ISubmitButtonProps } from './types.ts';

export default Handlebars.compile<ISubmitButtonProps>(
    `<button type="submit" class="submitButton" form="{{formId}}"><a href="{{href}}">{{label}}</a></button>`
);
