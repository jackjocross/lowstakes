import React from 'react';
import { SoundProvider } from './src/components/Sound';

import 'normalize.css';

export const wrapRootElement = ({ element }) => (
  <SoundProvider>{element}</SoundProvider>
);
