// import {
//     Chats,
//     Page_404,
//     Page_500,
//     Profile,
//     SignInPage,
//     SignUpPage
// } from './pages';
// import { Block } from './components';
// import { EventBus } from './components/EventBus';
import { Router } from './router.ts';

// export enum EPages {
//     signIn = '/signIn',
//     signUp = '/signUp',
//     profile = '/profile',
//     page404 = '/404',
//     page500 = '/500',
//     chats = '/chats'
// }
//
// const Pages = {
//     '/signIn': SignInPage,
//     '/signUp': SignUpPage,
//     '/profile': Profile,
//     '/404': Page_404,
//     '/500': Page_500,
//     '/chats': Chats
// };
//
// class Layout extends Block {
//     history;
//     constructor() {
//         const history = new EventBus();
//         const page = new SignInPage({ history });
//         super('div', { page });
//         this.history = history;
//         this.history.on('push', this._componentDidUpdate.bind(this));
//         this.history.emit('push', '/signIn');
//     }
//
//     componentDidUpdate(newPath) {
//         const oldPath = window.location.pathname;
//         console.log(oldPath, newPath);
//         if (oldPath !== newPath) {
//             const newPage = Pages[newPath] ?? Pages['/404'];
//
//             this.children.page = new newPage({ history: this.history });
//             window.history.pushState({}, '', newPath);
//             return true;
//         }
//         return false;
//     }
//
//     render() {
//         return this.compile(`{{{page}}}`, {
//             page: this.children.page
//         });
//     }
// }
// const layout = new Layout();

const router = new Router();

const root = document.getElementById('app');
root.appendChild(router.getContent());
