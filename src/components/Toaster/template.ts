import global from '@/globalStyles.module.css';
import styles from './styles.module.css';

export const template = `
    <div class="${global.bigSubtext} ${styles.title}">{{type}}</div> 
    <div class="${global.body1}">{{text}}</div>
`;
