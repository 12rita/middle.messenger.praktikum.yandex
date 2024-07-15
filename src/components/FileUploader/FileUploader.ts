import Handlebars from 'handlebars';
import './styles.css';

export default Handlebars.compile(
    `<div class="uploadInputWrapper">
   <input name="avatar" type="file" id="uploadInput" class="input inputFile" multiple>
   <img class="backgroundImg" alt="noPicture" src="../../static/noPicture.svg">
   
   <label for="uploadInput" class="uploadInputButton">
      
      <span class="body1 whiteText">Поменять аватар</span>
   </label>
</div>`
);
