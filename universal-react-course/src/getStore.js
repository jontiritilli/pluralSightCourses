import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import fetchQuestionsSaga from './sagas/fetch-questions.saga';
import * as reducers from './reducers';

export default function(defaultState) {
  const sagaMiddleware = createSagaMiddleware();
  const middelwareChain = [sagaMiddleware];
  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger();
    middelwareChain.push(logger);
  }
  const store = createStore(
    combineReducers({ ...reducers }),
    defaultState,
    applyMiddleware(...middelwareChain)
  );
  sagaMiddleware.run(fetchQuestionsSaga);
  return store;
}
