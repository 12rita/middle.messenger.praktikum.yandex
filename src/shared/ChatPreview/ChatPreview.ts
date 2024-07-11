import Handlebars from 'handlebars';
import './styles.css';

export default Handlebars.compile(`<li id="chat-{{id}}" class="wrapper">
  <div class="basicLine previewLine"></div>
  <div class="chat">
    <div class="avatar"></div>
    <div class="info">
      <div class="title blackText">{{title}}</div>
      <div class="message grayText body2">{{message}}</div>
    </div>
    <div class="time">
      <div class="grayText subtitle">{{time}}</div>
      <div class="indicator body3">{{indicator}}</div>
    </div>
  </div>
</li>`);
