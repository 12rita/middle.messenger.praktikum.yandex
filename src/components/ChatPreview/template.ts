import styles from './styles.module.css';

export const template = `<li id="chat-{{id}}" class="${styles.wrapper}">
  <div class="basicLine ${styles.previewLine}"></div>
  <div class="${styles.chat}">
    <div class="${styles.avatar}"></div>
    <div class="${styles.info}">
      <div class="title blackText">{{title}}</div>
      <div class="${styles.message} grayText body2">{{message}}</div>
    </div>
    <div class="${styles.time}">
      <div class="grayText subtitle">{{time}}</div>
      <div class="${styles.indicator} body3">{{indicator}}</div>
    </div>
  </div>
</li>`;
