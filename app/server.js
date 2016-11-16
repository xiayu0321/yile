/*eslint no-console: "off"*/
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import apiRouter from './api/api.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import db from './db/db';


var routes = require('./db/login-and-register.js');

const app = express();
const compiler = webpack(webpackConfig);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  lazy: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));

app.use(express.static('./public'));

app.use('/api', apiRouter);

app.get('/hello', function (req, res) {
  res.send('Index, world!');
});

app.post('/register', routes.insert);
app.post('/login', routes.login);
if (require.main === module) {
  app.listen(process.env.PORT || 3000, function () {
    db.connect((err) => {
      if (err) return console.error('db connection failed');
    });
    console.log('Listening on 3000');
  });
}

export default app;
