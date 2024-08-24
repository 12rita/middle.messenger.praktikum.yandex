import { JSDOM } from 'jsdom';

const jsdom = new JSDOM(`<body></body>`, { url: 'https://example.org/' });

const { window } = jsdom;

global.window = window;
global.document = window.document;
global.FormData = window.FormData;
global.history = window.history;
