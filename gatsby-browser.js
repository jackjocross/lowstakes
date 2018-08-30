import React from 'react';
import { SoundProvider } from './src/components/Sound/Provider';

import 'normalize.css';

export const wrapRootElement = ({ element }) => (
  <SoundProvider>{element}</SoundProvider>
);
