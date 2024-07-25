import styles from './styles.module.css';
import global from '../../globalStyles.module.css';
import noImage from '../../static/noPicture.svg';

export const template = `<div class="${styles.uploadInputWrapper}">
   <input name="avatar" type="file" id="uploadInput" class="input ${styles.inputFile}">
   <img alt="noPicture" class="${styles.backgroundImg}" src="${noImage}">
   
   <label for="uploadInput" class="${styles.uploadInputButton}">      
      <span class="${global.body1} ${global.whiteText}">{{label}}</span>
   </label>
</div>`;
