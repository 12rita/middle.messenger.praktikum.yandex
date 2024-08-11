import { Router } from '@shared/components';
import { user } from '@shared/stores/User.ts';

const router = new Router('#app');
user.checkAuthorise(router.start);
// router.start();

// const root = document.getElementById('app');
// root && root.appendChild(router.getContent());
