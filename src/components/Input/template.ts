import styles from './styles.module.css';

export const template = `<div class=${styles.inputWrapper}>
  <input class="${styles.input} body1" type="{{type}}" id="{{name}}" name="{{name}}" placeholder="{{placeholder}}">
  <label class="${styles.label} body1" for="{{name}}">{{placeholder}}</label>
</div>`;
