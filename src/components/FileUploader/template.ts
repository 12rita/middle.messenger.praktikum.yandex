import styles from './styles.module.css';

export const template = `<div class="${styles.uploadInputWrapper}">
   <input name="avatar" type="file" id="uploadInput" class="input ${styles.inputFile}" multiple>
   <img alt="noPicture" class="${styles.backgroundImg}" src="../../static/noPicture.svg">
   
   <label for="uploadInput" class="${styles.uploadInputButton}">      
      <span class="body1 whiteText">{{label}}</span>
   </label>
</div>`;
