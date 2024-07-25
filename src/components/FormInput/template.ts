import styles from './styles.module.css';
import global from '../../globalStyles.module.css';

export const template = `
<div class="${styles.inputWrapper}">
  {{{input}}}
  <label class="${styles.label} body1" for="{{name}}">{{placeholder}}</label>
</div>
  <div class="${styles.error} ${global.body3} {{hasError}}">{{error}}</div>
`;
