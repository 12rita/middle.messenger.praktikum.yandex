import { Router } from './router.ts';

const router = new Router();

const root = document.getElementById('app');
root.appendChild(router.getContent());
