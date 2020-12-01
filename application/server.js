const apiRoutes = require('./server/routes/apiRoutes.js');
const compression = require('compression');
const express = require('express');
const nextjs = require('next');
const sass = require('node-sass');
const globImporter = require('node-sass-glob-importer');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const port = process.env.PORT || 3000;
console.log(port)
const dev = process.env.NODE_ENV !== 'production';
const app = nextjs({ dev });
const handler = app.getRequestHandler();

const environment = 'development';
const config = require("./knexfile.js")[environment];
const knex = require("knex")(config);

app.prepare()
  .then(() => {
    // Initialize express.js server.
    const expressServer = express();

    // Serve gzipped content where possible.
    expressServer.use(compression());
    expressServer.use('/api', apiRoutes);

    // Add route to serve compiled SCSS from /assets/{build id}/main.css
    // Note: This is only used in production, in development css is inline.
    const sassResult = sass.renderSync({
      file: './styles/theme.scss',
      outputStyle: 'compressed',
      importer: globImporter(),
    });

    expressServer.get('/assets/:id/main.css', (req, res) => {
      res.setHeader('Content-Type', 'text/css');
      res.setHeader('Cache-Control', 'public, max-age=2592000');
      res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
      res.send(sassResult.css);
    });

    // Send robots.txt file from /static folder.
    const options = {
      root: `${__dirname}/static/`,
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
      },
    };
    expressServer.get('/robots.txt', (req, res) => (
      res.status(200).sendFile('robots.txt', options)
    ));

    // Set browser caching for all static files.
    expressServer.use('/static', express.static(`${__dirname}/static`, {
      maxAge: '7d',
    }));

    expressServer.get('*', (req, res) => handler(req, res));

    expressServer.listen(port, err => {
      if (err) throw err;
      console.log('> Ready on http://app.docker.localhost');
    });
  });



// const loadData = ()=>{
//   const timeot = setTimeout(function () {
//     request
//     .get('http://localhost')
//     .set('Content-Type', 'application/json')
//     .query({

//     })
//     .end((err, response) => {
//       if (err) {
//         console.log('[err]:',err);
//       }
//       const data = response.body.data;
//       if(data === ''){
//         loadData()
//       }
//       if (data && data.title != undefined) {
//         knex('test_table')
//         .returning('id')
//         .insert({title:data.title})
//         .then((resp)=>{
//             loadData()
//         })
//       }
//     });
//   }, 50000000);
// }

// loadData()
