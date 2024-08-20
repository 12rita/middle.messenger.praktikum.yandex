import { JSDOM } from 'jsdom';

const jsdom = new JSDOM();

global.document = jsdom.window.document;
global.window = jsdom.window;
global.FormData = jsdom.window.FormData;
