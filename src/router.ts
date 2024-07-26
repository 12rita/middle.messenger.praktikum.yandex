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
        const history = new EventBus<TPages>();
        const path = (
            window.location.pathname === '/'
                ? PAGES.signIn
                : window.location.pathname
        ) as keyof typeof Pages;
        const page = Pages[path] ?? Pages['/404'];
        super('div', { page: new page({ history }) });
        this.history = history;
        this.history.on('push', this._componentDidUpdate.bind(this));
        const pagesPath = path.substring(1) as keyof typeof PAGES;
        this.history.emit('push', PAGES[pagesPath]);
    }

    componentDidUpdate(newPath: TPages) {
        const oldPath = window.location.pathname;

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
