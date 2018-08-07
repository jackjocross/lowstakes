import React from 'react';
import { Router } from 'react-router-dom';
import { SoundProvider } from './src/components/Sound';

import 'normalize.css';

export const onClientEntry = () => {
  // Don't need to do anything here, but if you don't
  // export something, the import won't work.
};

export const replaceRouterComponent = ({ history }) => ({ children }) => (
  <Router history={history}>
    <>
      <SoundProvider>{children}</SoundProvider>
    </>
  </Router>
);
