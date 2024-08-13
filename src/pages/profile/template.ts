import styles from './styles.module.css';

export const template = `
    {{{backButton}}}
    
        {{{avatar}}}

    <div class="title ${styles.profileTitle}" id="title">{{title}}</div> 
    <div>
     {{{form}}} 
     <div class="${styles.error}">
     {{{error}}}
</div>
     
        <div class="${styles.buttonBlock}">
    {{{buttonBlock}}}
  </div>
    </div>
`;
