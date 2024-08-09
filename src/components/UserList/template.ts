import styles from './styles.module.css';
import global from '../../globalStyles.module.css';

export const template = `
      {{#each usersBlock}}
    {{{this}}}
    {{/each}}
`;

export const itemTemplate = `
<div class="${styles.info}">
<img class="${styles.image}" alt="avatar" src="{{avatar}}">
<div class="${global.bigSubtext}">
{{name}}
</div>
</div>
`;
