import { Router } from '@shared/components';

import { authApi } from '@api';

authApi.checkAuthorise();
new Router('#app');
