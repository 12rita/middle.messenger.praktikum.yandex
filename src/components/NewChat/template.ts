import styles from './styles.module.css';
import global from '@/globalStyles.module.css';
export const template = `
{{{modal}}}
 </div>
    {{{addButton}}}
</div>`;

export const modalTemplate = `
<div id="addForm" class="${styles.form}">
<div class="${global.bigSubtext}">
  Новый чат
</div>
<div>
   {{{input}}}
</div>

{{{users}}}
<div>
   {{{inputName}}}
</div>
<div class="${styles.button}">
{{{submitButton}}}
</div>
`;
