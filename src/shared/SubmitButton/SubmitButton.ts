import Handlebars from 'handlebars';
import './styles.css';

export default Handlebars.compile(
    `<button type="submit" class="submitButton" form="{{formId}}"><a href="{{href}}">{{label}}</a></button>`
);
