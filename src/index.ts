import { Router } from '@shared/components';

import { authApi } from '@api';
new Router('#app');
authApi.checkAuthorise();
