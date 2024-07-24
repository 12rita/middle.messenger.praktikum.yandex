import { Router } from './router.ts';

const router = new Router();

const root = document.getElementById('app');
root && root.appendChild(router.getContent());
