// the polyfills must be one of the first things imported in node.js.
// The only modules to be imported higher - node modules with es6-promise 3.x or other Promise polyfill dependency
// (rule of thumb: do it if you have zone.js exception that it has been overwritten)
// if you are including modules that modify Promise, such as NewRelic,, you must include them before polyfills
import 'angular2-universal-polyfills';
import 'ts-helpers';
// temporary until 2.1.1 things are patched in Core
import './platform/workarounds/__workaround.node';

import * as fs from 'fs';
import * as path from 'path';
import * as morgan from 'morgan';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';

// Angular 2
import { enableProdMode } from '@angular/core';
// Angular 2 Universal
import { createEngine } from 'angular2-express-engine';

// App
import { MainModuleNgFactory } from './platform/modules/node.module.ngfactory';

import { Route } from './route';
import { routes } from './routes';

// enable prod for faster renders
enableProdMode();

const app = express();

const ROOT = path.join(path.resolve(__dirname, '..'));

// Express View
app.engine('.html', createEngine({
  // this needs to be false when using ngFactory
  precompile: false,
  ngModule: MainModuleNgFactory,
  providers: [
    // use only if you have shared state between users
    // { provide: 'LRU', useFactory: () => new LRU(10) }

    // stateless providers only since it's shared
  ]
}));
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname);
app.set('view engine', 'html');
app.set('json spaces', 2);

app.use(cookieParser('Prometheus Universal'));
app.use(bodyParser.json());
app.use(compression());

const accessLogStream = fs.createWriteStream(ROOT + '/morgan.log', { flags: 'a' })

app.use(morgan('common', {
  skip: (req, res) => res.statusCode < 400,
  stream: accessLogStream
}));

function cacheControl(req, res, next) {
  // instruct browser to revalidate in 60 seconds
  res.header('Cache-Control', 'max-age=60');
  next();
}

// Serve static files
app.use('/assets', cacheControl, express.static(path.join(__dirname, 'assets'), { maxAge: 30 }));
app.use('/styles', cacheControl, express.static(path.join(__dirname, 'styles'), { maxAge: 30 }));

app.use(cacheControl, express.static(path.join(ROOT, 'dist/client'), { index: false }));

function ngApp(req, res) {

  function onHandleError(parentZoneDelegate, currentZone, targetZone, error) {
    console.warn('Error in SSR, serving for direct CSR');
    res.sendFile('index-aot.html', { root: './src' });
    return false;
  }

  Zone.current.fork({ name: 'CSR fallback', onHandleError }).run(() => {
    res.render('index-aot', {
      req,
      res,
      // time: true, // use this to determine what part of your app is slow only in development
      async: true,
      preboot: true,
      baseUrl: '/',
      requestUrl: req.originalUrl,
      originUrl: `http://localhost:${app.get('port')}`
    });
  });

}

// Routes
app.get('/', ngApp);
for (var key in routes) {
  app.get(`/${routes[key].path}`, ngApp);
}

app.get('*', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(404).send(JSON.stringify({
    status: 404,
    message: 'Unknown destination!'
  }, null, 2));
});

// Server
let server = app.listen(app.get('port'), () => {
  console.log(`Listening on: http://localhost:${server.address().port}`);
});
