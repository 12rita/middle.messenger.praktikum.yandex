import { PAGES, TPages } from './types.ts';
import { Route } from './route.ts';
import { Pages } from './pages.ts';
import { api, ROUTES } from '@api';

export class Router {
    routes: Route[] = [];
    _currentRoute: Route | null = null;
    _rootQuery: string = '';
    history;
    private static __instance: Router;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
        this.init();
    }

    init() {
        Object.keys(Pages).forEach(key => {
            const route = new Route(key, Pages[key as TPages], {
                rootQuery: this._rootQuery
            });
            this.routes.push(route);
        });
        const baseRoute = new Route('/', Pages[PAGES.chats], {
            rootQuery: this._rootQuery
        });
        this.routes.push(baseRoute);
    }

    checkAuthorise = () => {
        api.get(ROUTES.user, {
            credentials: 'include',
            mode: 'cors',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            }
        })
            .then(() => {
                this._onRoute(window.location.pathname);
            })
            .catch(e => {
                console.log({ e });
                this._onRoute(PAGES.signIn);
            });
    };

    start() {
        window.onpopstate = event => {
            this._onRoute((event.currentTarget as Window).location.pathname);
        };

        // this._onRoute(window.location.pathname);

        this.checkAuthorise();
    }

    _onRoute(pathname: string) {
        let route = this.getRoute(pathname);

        if (!route) {
            route = this.getRoute(PAGES.page404);
        }
        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route as Route;
        route && route.render();
    }

    go(pathname: string) {
        this.history && this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history && this.history.back();
    }

    forward() {
        this.history && this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}
