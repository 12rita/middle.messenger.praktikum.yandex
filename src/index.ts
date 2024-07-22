import { signInPage } from './pages/signIn/SignIn.ts';

// const ChatsPage = new Chats({});

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('app');
    root.appendChild(signInPage.getContent());
});
