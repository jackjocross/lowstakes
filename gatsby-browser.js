import React from 'react';
import { css } from 'glamor';
import { Location } from '@reach/router';
import { Flipper } from 'react-flip-toolkit';
import { SoundProvider } from './src/components/Sound/Provider';

import 'normalize.css';

css.global('html', {
  fontFamily:
    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
  backgroundColor: '#f5f7f9',
});

export const wrapRootElement = ({ element }) => (
  <SoundProvider>
    <Location>
      {({ location }) => <Flipper flipKey={location.key}>{element}</Flipper>}
    </Location>
  </SoundProvider>
);
