import styles from './styles.module.css';

export const template = `<main class="${styles.layout}">

    <button class="back">
        <a href="../chats/Chats.html">
            <img alt="back" src="../../static/sendButton.svg">
        </a>
    </button>


    <div id="profilePicture" class="profilePicture">
        <img alt="noPicture" src="../../static/noPicture.svg">
    </div>
    <div class="title profileTitle" id="title"></div>
    <form class="form" id="signInForm" name="profileForm">
{{{form}}}
    </form>
    <div class="buttonBlock">
        {{{textButtonChangeData}}}
        <div class="basicLine"></div>
        {{{textButtonChangePassword}}}
        <div class="basicLine"></div>
         {{{textButtonExit}}}
    </div>

</main>`;
