import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import getStore from './getStore';

const store = getStore();

const fetchDataForLocation = () => {
  store.dispatch({ type: 'REQUEST_FETCH_QUESTIONS' });
};

const render = MyApp => {
  ReactDom.render(
    <Provider store={store}>
      <MyApp />
    </Provider>,
    document.getElementById('root')
  );
};

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
render(App);
fetchDataForLocation();
