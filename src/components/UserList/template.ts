import styles from './styles.module.css';
import global from '../../globalStyles.module.css';

export const existedTemplate = `
<div class="${global.bigSubtext} ${styles.title}">
Участники чата {{title}}
</div>
      {{#each usersBlock}}
    {{{this}}}
    {{/each}}
<div class=" ${styles.title}">


    {{{deleteButton}}}
    </div>
`;

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
