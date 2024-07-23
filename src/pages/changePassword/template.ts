import styles from './styles.module.css';

export const template = `
 {{{backButton}}}
 <div id="profilePicture" class="${styles.profilePicture}">
        {{{avatar}}}
    </div>
    <div class="title ${styles.profileTitle}" id="title">{{title}}</div> 
 {{{form}}} 
  <div class="${styles.buttonBlock}">
    {{{submitButton}}}
  </div>
`;
