import {
    ChangePassword,
    Chats,
    Page_404,
    Page_500,
    Profile,
    SignInPage,
    SignUpPage
} from './pages';
import { Block } from './components';
import { EventBus } from './components/EventBus';

const Pages = {
    '/signIn': SignInPage,
    '/signUp': SignUpPage,
    '/profile': Profile,
    '/404': Page_404,
    '/500': Page_500,
    '/chats': Chats,
    '/changePassword': ChangePassword
};

export class Router extends Block {
    history;
    constructor() {
        const history = new EventBus();
        const page = new SignInPage({ history });
        super('div', { page });
        this.history = history;
        this.history.on('push', this._componentDidUpdate.bind(this));
        this.history.emit('push', '/signIn');
    }

    componentDidUpdate(newPath: string) {
        const oldPath = window.location.pathname;
        console.log(oldPath, newPath);
        if (oldPath !== newPath) {
            const newPage = Pages[newPath] ?? Pages['/404'];

            this.children.page = new newPage({ history: this.history });
            window.history.pushState({}, '', newPath);
            return true;
        }
        return false;
    }

    render() {
        return this.compile(`{{{page}}}`, {
            page: this.children.page
        });
    }
}
