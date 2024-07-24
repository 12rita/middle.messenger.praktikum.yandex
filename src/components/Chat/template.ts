import styles from './styles.module.css';
import attache from '../../static/attach.svg';
import sendButton from '../../static/sendButton.svg';

export const template = `
  <div class="${styles.header}">
  <div class="${styles.chatAvatar}"></div>
  <div class="title">{{title}}</div>
  </div>
  <div class="basicLine ${styles.chatLine}"></div>
      <div class="${styles.mainInfo}">      
    
      <div class="${styles.messageText} body2">
      {{message}}
      <div class="${styles.timeText} grayText subtitle">{{time}}</div>
    </div>
    </div>
    <div class="${styles.footer}">
    <div class="basicLine ${styles.chatLine}"></div>
    <div class="${styles.footerWrapper}">
    <div class="icon"><img alt="attach" src="${attache}"></div>
  
    <input class="${styles.messageInput}"  type="text" id="message" name="message" placeholder="Сообщение">

<button class="${styles.sendMessage}" ><img alt="attach" src="${sendButton}"></button>
</div>
  </div>`;
