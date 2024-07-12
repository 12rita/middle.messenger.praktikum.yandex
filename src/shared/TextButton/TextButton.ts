import Handlebars from 'handlebars';
import './styles.css';

export default Handlebars.compile(
    `<button class="textButton" id="{{id}}">{{label}}</button>`
);
