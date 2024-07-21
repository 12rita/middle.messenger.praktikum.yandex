import { chatPreview } from '../../components';

import { data } from './data.ts';
import { Plug } from '../../components';
import { chat } from '../../components';
import { View } from './ViewClass.ts';

export class Chats extends View {
    main = `<main class="layout">
    <div class="chatWrapper">
        <div class="headerWrapper">
            <a href="../profile/Profile.html" class="grayText profileButton body1">Профиль
                <img class="profileButton" src="../../static/arrowRight.svg" alt="arrow">
            </a>

        <div class="searchWrapper">
            <label for="search"></label><input class="search" type="text" id="search" name="search"
                                               placeholder="🔍 Поиск">
        </div>


        </div>
        <ul id="chatList" class="chatList">

        </ul>
    </div>
    <div id="chatField" class="chatField">
    </div>

</main>`;

    constructor(props) {
        super(props);
        // const plug = new Plug({});
    }

    render() {
        return { main: this.main, title: 'Chats' };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const chatField = document.querySelector('#chatField');
    const chatList = document.querySelector('#chatList');
    const plug = new Plug({});
    if (chatField) chatField.innerHTML = plug.render()({});

    if (chatList) {
        data.map(item => {
            chatList.innerHTML += chatPreview({
                ...item
            });
        });
    }

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && chatField)
            chatField.innerHTML = plug.render()({});
    });

    const chats = document.querySelectorAll(`[id^="chat-"]`);

    const handleChatClick = (id: string) => {
        const activeChat = data.find(item => item.id === id);
        if (chatField && activeChat)
            chatField.innerHTML = chat({ ...activeChat });
    };

    chats.forEach(item => {
        item.addEventListener('click', () => {
            const [, id] = item.id.split('-');
            handleChatClick(id);
        });
    });
});
