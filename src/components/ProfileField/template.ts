import styles from './styles.module.css';

export const template = `
<div>
<div class=${styles.field}>
<div class="blackText body1">{{title}}</div>
<input name="{{name}}" class="${styles.fieldValue} grayText body1" id="profileField-{{key}}" type="{{type}}" value=" {{value}}" "{{disabled}}">
</div>
<div class="basicLine ${styles.profileLine}"></div>
</div>
`;
