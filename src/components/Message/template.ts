import styles from './styles.module.css';
import global from '../../globalStyles.module.css';

export const template = `
      
      <div class="${styles.messageText} ${global.body2}">
      {{message}}
      <div class="${styles.timeText} ${global.grayText} ${global.subtitle}">{{time}}</div>
    </div>
`;
