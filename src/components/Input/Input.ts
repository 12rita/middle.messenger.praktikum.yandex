import Handlebars from 'handlebars';
import './styles.css';
import { IInputProps } from './types.ts';

export default Handlebars.compile<IInputProps>(
    `<div class="inputWrapper">
  <input class="input body1" type="{{type}}" id="{{name}}" name="{{name}}" placeholder="{{placeholder}}">
  <label class="label body1" for="{{name}}">{{placeholder}}</label>
</div>`
);
