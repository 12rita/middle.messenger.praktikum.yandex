import Handlebars from 'handlebars';
import './styles.css';
import attache from '../../../static/attach.svg';
import sendButton from '../../../static/sendButton.svg';

export default Handlebars.compile(`<div class="chatFieldWrapper">
  <div class="header">
  <div class="chatAvatar"></div>
  <div class="title">{{title}}</div>
  </div>
  <div class="basicLine chatLine"></div>
      <div class="mainInfo">
      
    
      <div class="messageText body2">
      {{message}}
      <div class="timeText grayText subtitle">{{time}}</div>
    </div>
    </div>
    <div class="footer">
    <div class="basicLine chatLine"></div>
    <div class="footerWrapper">
    <div class="icon"><img alt="attach" src="${attache}"></div>
  
    <input class="messageInput"  type="text" id="message" name="message" placeholder="Сообщение">

<button class="sendMessage" ><img alt="attach" src="${sendButton}"></button>
</div>
  </div>
</div>`);
