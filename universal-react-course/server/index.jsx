import express from 'express';
// eslint-disable-next-line no-unused-vars
import yields from 'express-yields';
import fs from 'fs-extra';
import webpack from 'webpack';
import wpDevMiddleware from 'webpack-dev-middleware';
import wpHotMiddleware from 'webpack-hot-middleware';

const PORT = process.env.PORT || 3000;
const app = express();
const config = require('../webpack.config.dev.babel');

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config.default);
  app.use(
    wpDevMiddleware(compiler, {
      noInfo: true,
    })
  );
  app.use(wpHotMiddleware(compiler));
}
app.get(['/'], function*(req, res) {
  const index = yield fs.readFile('./public/index.html', 'utf-8');
  res.send(index);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`App running on ${PORT}`);
});
