import { Provider } from 'react-redux';
import { Fragment } from 'react';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import HtmlHead from '../components/HtmlHead';
import configureStore from '../store/store';
import '../components/PageProgressBar'; // Beautiful page transition indicator.

const App = ({ Component, store, ...pageProps }) => (
  <Provider store={store}>
    <Fragment>
      <HtmlHead />
      <Component {...pageProps} />
    </Fragment>
  </Provider>
);

export default withRedux(configureStore)(withReduxSaga(App));
