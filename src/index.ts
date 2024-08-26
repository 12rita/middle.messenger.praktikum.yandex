import { PAGES, Router, TPages } from '@shared/components';

import { authApi } from '@api';
import { Pages } from '@shared/components/Router/pages.ts';
import store from '@shared/stores/Store.ts';
const router = new Router('#app');
Object.keys(Pages).forEach(key => {
    router.use(key as TPages, Pages[key as TPages]);
});
router.use('/', Pages[PAGES.chats]);

authApi.checkAuthorise().then(() => {
    router.start(!!store.getState().authorised);
});
