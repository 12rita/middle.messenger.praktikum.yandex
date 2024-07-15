import Handlebars from 'handlebars';
import './styles.css';
import { textButton } from '../TextButton';
import { IErrorProps } from './types.ts';

export default Handlebars.compile<IErrorProps>(
    `<div class="layoutError">
  <h1 class="bigText errorCode">{{errorCode}}</h1>
  <h2 class="bigSubtext errorText">{{errorText}}</h2>

  ${textButton({ label: '{{label}}', id: '{{id}}' })}
</div>`
);
