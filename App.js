import React from 'react';
import Main from './components/MainComponent';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';

const store = ConfigureStore();

export default function App() {
  return (
    // preapred our application to connect to the store
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

