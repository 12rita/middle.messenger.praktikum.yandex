import styles from './styles.module.css';
export const template = `<main class=${styles.layout}>
    <div class=${styles.chatWrapper}>
        <div class=${styles.headerWrapper}>
            {{{profileButton}}}
               {{{input}}}
             </div>
       {{{chatsList}}}
    </div>
    <div id="chatField" class="${styles.chatField}">
    {{{activeChat}}}
    </div>
    {{{newChat}}}

</main>`;
