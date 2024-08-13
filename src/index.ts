import { Router } from '@shared/components';

import { userApi } from '@api';

userApi.checkAuthorise();
new Router('#app');
// user.checkAuthorise(router.start);
// router.start();

// const root = document.getElementById('app');
// root && root.appendChild(router.getContent());
