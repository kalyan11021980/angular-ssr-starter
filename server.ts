import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as compression from 'compression';
import * as express from 'express';
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');
const fs = require('fs');
const path = require('path');
const filterEnv = require('filter-env');
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
enableProdMode();
const dotenv = require('dotenv');
dotenv.config();
const config = filterEnv(/(BB_\w+)/, {json: true, freeze: true});

const PORT = process.env.BB_PORT || 8000;

// Provide support for window on the server
const domino = require('domino');
const template = fs.readFileSync(path.join('dist/browser', 'index.html')).toString();
const fetch = require('node-fetch');
const win = domino.createWindow(template);

win.fetch = fetch;
global['window'] = win;
Object.defineProperty(win.document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  },
});
global['document'] = win.document;
global['CSS'] = null;
// global['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;
global['Prism'] = null;

const app = express();

// Config renderer
try {
  app.engine('html', (_, options, callback) => {
    const engine = ngExpressEngine({
      bootstrap: AppServerModuleNgFactory,
      providers: [
        provideModuleMap(LAZY_MODULE_MAP),
        { provide: 'REQUEST', useFactory: () => options.req, deps: [] },
        { provide: 'CONFIG', useFactory: () => config, deps: [] }
      ]
    });
    engine(_, options, callback);
  });
} catch (e) {
  console.log('error', 'there is sonme issue defining app engine ' + e);
}

// configs
app.enable('etag');

// Middleware
app.use(compression());
app.set('view engine', 'html');
app.set('views', 'dist/browser');
app.set('view cache', true);
app.use('/', express.static('dist/browser', { index: false, maxAge: 30 * 86400000 }));

// All regular routes use the Universal engine
app.get('', (req, res) => {
    res.render('index', {
        req: req,
        res: res,
        preboot: true
      });
  });

app.get('/env', (req, res) => {
  res.json(process.env);
})
  
app.listen(PORT,() => {
  console.log(`we are serving the site for you at http://localhost:${PORT}!`);
});