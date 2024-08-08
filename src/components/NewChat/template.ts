import styles from './styles.module.css';

export const template = `
{{{modal}}}
 </div>
    {{{addButton}}}
</div>`;

export const modalTemplate = `
<div >
<div class="${styles.header}">
  New Chat
</div>
<label for="search"></label>
<input  type="text" id="search" name="search" placeholder="🔍 Поиск">
</div>
`;
