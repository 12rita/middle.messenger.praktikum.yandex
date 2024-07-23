import styles from './styles.module.css';

export const template = `
    {{{backButton}}}
    <div id="profilePicture" class="${styles.profilePicture}">
        {{{avatar}}}
    </div>
    <div class="title ${styles.profileTitle}" id="title">{{title}}</div> 
    <div>
     {{{form}}} 
        <div class="${styles.buttonBlock}">
    {{{buttonBlock}}}
  </div>
    </div>
`;
