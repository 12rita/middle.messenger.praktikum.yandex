import styles from './styles.module.css';
import global from '../../globalStyles.module.css';
import attache from '../../static/attach.svg';

export const template = `
  <div  class="${styles.header}">
  <div class="${styles.chatAvatar}">{{{avatarBlock}}}</div>
  <div class="${global.title}">{{title}}</div>
  </div>
  <div class="${global.basicLine} ${styles.chatLine}"></div>
  {{{messagesList}}}
    
    <div class="${styles.footer}">
    <div class="${global.basicLine} ${styles.chatLine}"></div>
    <div class="${styles.footerWrapper}">
    <div class="icon"><img alt="attach" src="${attache}"></div>
  {{{input}}}   

{{{sendButton}}}
</div>
{{{modal}}}
  </div>`;
