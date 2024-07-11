import Handlebars from 'handlebars';
import './styles.css';

export default Handlebars.compile(`
<div>
<div class="field">
<div class="blackText body1">{{title}}</div>
<input class="fieldValue grayText body1" value=" {{value}}" disabled>
</div>
<div class="basicLine profileLine"></div>
</div>
`);
