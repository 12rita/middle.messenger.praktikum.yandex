import {
    ChangePasswordPage,
    ChatsPage,
    Page_404,
    Page_500,
    ProfilePage,
    SignInPage,
    SignUpPage
} from './pages';
import { Block, IBlock, EventBus, PAGES, TPages } from './shared';

const Pages = {
    '/signIn': SignInPage,
    '/signUp': SignUpPage,
    '/profile': ProfilePage,
    '/404': Page_404,
    '/500': Page_500,
    '/chats': ChatsPage,
    '/changePassword': ChangePasswordPage
};

export class Router extends Block {
    history;
    constructor() {
        const history = new EventBus();
        const page = new SignInPage({ history });
        super('div', { page });
        this.history = history;
        this.history.on('push', this._componentDidUpdate.bind(this));
        this.history.emit('push', PAGES.signIn);
    }

    componentDidUpdate(newPath: TPages) {
        const oldPath = window.location.pathname;
        console.log(oldPath, newPath);
        if (oldPath !== newPath) {
            const newPage = Pages[newPath] ?? Pages['/404'];

            this.children.page = new newPage({
                history: this.history
            }) as IBlock;
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
