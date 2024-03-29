import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import { join } from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./server/main');

// let stores: any[] = [];

// axios.get(
//   'https://produtos-server.herokuapp.com/api/stores',
//   { headers: {
//     'authorization': 't5b3b9a5',
//     'Access-Control-Allow-Origin': '*'
//   }
// }).then(resp => {
//   stores = resp.data;
// });

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', (_, options, callback) => {
  const engine = ngExpressEngine({
      bootstrap: AppServerModuleNgFactory,
      providers: [
          // { provide: 'request', useFactory: () => options.req, deps: [] },
          { provide: 'host', useFactory: () => options.req.get('host'), deps: [] },
          { provide: 'param', useFactory: () => options.req.params[0], deps: [] },
          provideModuleMap(LAZY_MODULE_MAP)
      ]
  });
  engine(_, options, callback);
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
