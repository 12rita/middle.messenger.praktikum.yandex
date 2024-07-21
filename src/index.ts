import { Chats } from './pages/chats';

const ChatsPage = new Chats({});

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('app');
    root.innerHTML = ChatsPage.getContent();
});
