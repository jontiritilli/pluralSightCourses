import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import App from './App';
import getStore from './getStore';

const history = createHistory();

const store = getStore(history);

const fetchDataForLocation = () => {
  store.dispatch({ type: 'REQUEST_FETCH_QUESTIONS' });
};

const render = MyApp => {
  ReactDom.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MyApp />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
};

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line
    const NextApp = require('./App').default;
    render(NextApp);
  });
}

store.subscribe(() => {
  const state = store.getState();
  if (state.Questions.length) {
    console.log('Mounting App');
    render(App);
  } else {
    console.log('App not mounted');
  }
});

fetchDataForLocation();
