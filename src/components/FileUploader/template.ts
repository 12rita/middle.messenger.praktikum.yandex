import styles from './styles.module.css';
import global from '../../globalStyles.module.css';
import noPicture from '../../static/noPicture.svg';

export const template = `<div class="${styles.uploadInputWrapper}">
<form id='avatarForm'>
   {{{input}}}
   
</form>
   <img alt="noPicture" class="${styles.backgroundImg}" src="${noPicture}">
   
   <label for="uploadInput" class="${styles.uploadInputButton}">      
      <span class="${global.body1} ${global.whiteText}">{{label}}</span>
   </label>
</div>`;
