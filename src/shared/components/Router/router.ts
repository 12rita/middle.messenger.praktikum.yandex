import { TPages } from './types.ts';
import { Route } from './route.ts';
import { Pages } from './pages.ts';

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
        const baseRoute = new Route('/', Pages['/sign-in'], {
            rootQuery: this._rootQuery
        });
        this.routes.push(baseRoute);
    }

    start() {
        window.onpopstate = event => {
            this._onRoute((event.currentTarget as Window).location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

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