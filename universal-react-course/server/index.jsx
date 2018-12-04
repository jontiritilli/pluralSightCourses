import express from 'express';
// eslint-disable-next-line
import yields from 'express-yields';
import fs from 'fs-extra';
import webpack from 'webpack';
import wpDevMiddleware from 'webpack-dev-middleware';
import wpHotMiddleware from 'webpack-hot-middleware';
import { argv } from 'optimist';
import { get } from 'request-promise';
import { delay } from 'redux-saga';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createMemoryHistory';
import React from 'react';
import getStore from '../src/getStore';
import App from '../src/App';
import { questions, question } from '../data/api-real-uri';

const PORT = process.env.PORT || 3000;
const app = express();
const config = require('../webpack.config.dev.babel');

const useLiveData = argv.useLiveData === 'true';
const useServerRender = argv.useServerRender === 'true';

function* getQuestions() {
  const data = useLiveData
    ? yield get(questions, { gzip: true })
    : yield fs.readFile('./data/mock-questions.json', 'utf-8');
  return JSON.parse(data);
}

function* getQuestion(qId) {
  let data;
  if (useLiveData) {
    data = yield get(question(qId), { gzip: true, json: true });
  } else {
    const questionsResponse = yield getQuestions();
    const oneQuestion = questionsResponse.items.find(
      // eslint-disable-next-line
      _question => _question.question_id == qId
    );
    oneQuestion.body = `Mock question body: ${oneQuestion}`;
    data = { items: [oneQuestion] };
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

app.get(['/', 'questions/:id'], function*(req, res) {
  let index = yield fs.readFile('./public/index.html', 'utf-8');

  const initialState = {
    Questions: [],
  };
  const history = createHistory({
    initialEntries: [req.path],
  });
  const _questions = yield getQuestions();
  initialState.Questions = _questions.items;
  const store = getStore(history, initialState);
  if (useServerRender) {
    const appRendered = renderToString(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    );
    index = index.replace(`<%= preloadedApplication %>`, appRendered);
  } else {
    index = index.replace(
      `<%= preloadedApplication %>`,
      `Please wait while we load the application.`
    );
  }
  res.send(index);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`App running on port ${PORT}`);
});
