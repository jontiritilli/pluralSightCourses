import express from 'express';
// eslint-disable-next-line no-unused-vars
import yields from 'express-yields';
import fs from 'fs-extra';
import webpack from 'webpack';
import wpDevMiddleware from 'webpack-dev-middleware';
import wpHotMiddleware from 'webpack-hot-middleware';
import { argv } from 'optimist';
import { get } from 'request-promise';
import { delay } from 'redux-saga';
import { questions, question } from '../data/api-real-uri';

const PORT = process.env.PORT || 3000;
const app = express();
const config = require('../webpack.config.dev.babel');

const useLiveData = argv.useLiveData === 'true';

function* getQuestions() {
  let data = useLiveData
    ? yield get(questions, { gzip: true })
    : yield fs.readFile('./data/mock-questions.json', 'utf-8');
  return JSON.parse(data);
}

function* getQuestion(qId) {
  let data;
  if (useLiveData) {
    data = yield get(question(qId), { gzip: true, json: true });
  } else {
    const questions = yield getQuestions();
    const question = questions.items.find(
      _question => _question.question_id == qId
    );
    question.body = `Mock question body: ${question}`;
    data = { items: [question] };
  }
  return data;
}

app.get('/api/questions', function*(req, res) {
  const data = yield getQuestions();
  yield delay(150);
  res.json(data);
});

app.get('/api/questions/:id', function*(req, res) {
  const data = yield getQuestion(req.params.id);
  yield delay(150);
  res.json(data);
});

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
