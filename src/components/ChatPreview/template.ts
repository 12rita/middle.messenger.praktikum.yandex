import styles from './styles.module.css';
import global from '../../globalStyles.module.css';

export const template = `
  <div class="${global.basicLine} ${styles.previewLine}"></div>
  <div class="${styles.chat}">
    <div class="${styles.avatar}"></div>
    <div class="${styles.info}">
      <div class="${global.title} ${global.blackText}">{{title}}</div>
      <div class="${styles.message} ${global.grayText} ${global.body2}">{{message}}</div>
    </div>
    <div class="${styles.time}">
      <div class="${global.grayText} ${global.subtitle}">{{time}}</div>
      <div class="${styles.indicator} ${global.body3}">{{indicator}}</div>
    </div>
  </div>
`;
