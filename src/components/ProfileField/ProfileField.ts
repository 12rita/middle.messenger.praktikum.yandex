import Handlebars from 'handlebars';
import './styles.css';
import { IProfileFieldProps } from './types.ts';

export default Handlebars.compile<IProfileFieldProps>(`
<div>
<div class="field">
<div class="blackText body1">{{title}}</div>
<input name="{{name}}" class="fieldValue grayText body1" id="profileField-{{key}}" type="{{type}}" value=" {{value}}" disabled="{{disabled}}">
</div>
<div class="basicLine profileLine"></div>
</div>
`);
