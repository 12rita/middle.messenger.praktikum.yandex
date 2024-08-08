import styles from './styles.module.css';
export const template = `<main class=${styles.layout}>
    <div class=${styles.chatWrapper}>
        <div class=${styles.headerWrapper}>
            {{{profileButton}}}

        <div class="${styles.searchWrapper}">
            <label for="search"></label><input class="${styles.search}" type="text" id="search" name="search"
                                               placeholder="🔍 Поиск">
        </div>


        </div>
        <ul id="chatList" class="${styles.chatList}">
    {{#each chats}}
    {{{this}}}
    {{/each}}
        </ul>
    </div>
    <div id="chatField" class="${styles.chatField}">
    {{{activeChat}}}
    </div>
    {{{newChat}}}

</main>`;
