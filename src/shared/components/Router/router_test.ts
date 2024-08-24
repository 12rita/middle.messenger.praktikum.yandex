export class Router {
    routes: unknown[] = [];
    _currentRoute: unknown | null = null;
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
        // store.on(StoreEvents.Updated, this.start);
    }

    init() {
        [1, 2, 3].forEach(() => {
            const route = {};
            this.routes.push(route);
        });
        // const baseRoute = new Route('/', Pages[PAGES.chats], {
        //     rootQuery: this._rootQuery
        // });
        // this.routes.push(baseRoute);
    }

    start = () => {
        window.onpopstate = event => {
            this._onRoute((event.currentTarget as Window).location.pathname);
        };

        const authorised = true;

        if (authorised) {
            this._onRoute(window.location.pathname);
        } else {
            this._onRoute('1');
        }
    };

    _onRoute(pathname: string) {
        let route = this.getRoute(pathname);

        if (!route) {
            route = this.getRoute('2');
        }
        // if (this._currentRoute && this._currentRoute !== route) {
        //     this._currentRoute.leave();
        // }
        //
        // this._currentRoute = route as Route;
        // route && route.render();
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
        return this.routes.find(route => route === pathname);
    }
}
