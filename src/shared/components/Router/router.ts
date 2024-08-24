import { PAGES, TPageBlock, TPages } from './types.ts';
import { Route } from './route.ts';

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
    }

    use(pathname: TPages | '/', block: TPageBlock) {
        const route = new Route(pathname, block, {
            rootQuery: this._rootQuery
        });
        this.routes.push(route);
        return this;
    }

    start = (authorised: boolean) => {
        window.onpopstate = event => {
            this._onRoute((event.currentTarget as Window).location.pathname);
        };

        if (authorised) {
            this._onRoute(window.location.pathname);
        } else {
            this._onRoute(PAGES.signIn);
        }
    };

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
