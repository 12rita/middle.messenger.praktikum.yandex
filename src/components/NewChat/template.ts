import styles from './styles.module.css';
import global from '@/globalStyles.module.css';
export const template = `
{{{modal}}}
 </div>
    {{{addButton}}}
</div>`;

export const modalTemplate = `
<div id="addForm" class="${styles.wrapper}">
<div  class="${styles.form}">
<div class="${global.bigSubtext}">
  {{{header}}}
</div>
<div>
   {{{input}}}
</div>

{{{users}}}
<div>
   {{{inputName}}}
</div>
<form id="{{avatarForm}}">
{{{inputAvatar}}}
</form>

<div class="${styles.buttonBlock}">
{{{deleteButton}}}

{{{submitButton}}}
</div>
</div>
{{{existedUsers}}}
</div>
`;
