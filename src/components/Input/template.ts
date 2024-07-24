import styles from './styles.module.css';

export const template = `
  <input class="${styles.input} body1" type="{{type}}" name="{{name}}" placeholder="{{placeholder}}">
  <label class="${styles.label} body1" for="{{name}}">{{placeholder}}</label>
`;
