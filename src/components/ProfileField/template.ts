import styles from './styles.module.css';
import global from '../../globalStyles.module.css';

export const template = `
<div class=${styles.field}>
<div class="${global.blackText} ${global.body1}">{{title}}</div>
{{{input}}}
</div>
<div class="${styles.error} ${global.body3} {{hasError}}">{{error}}</div>
<div class="${global.basicLine} ${styles.profileLine}"></div>
`;
