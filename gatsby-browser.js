import React from 'react';
import { SoundProvider } from './src/components/Sound';

import 'normalize.css';

// export const onClientEntry = () => {
//   // Don't need to do anything here, but if you don't
//   // export something, the import won't work.
// };

export const wrapRootElement = ({ element }) => (
  <SoundProvider>{element}</SoundProvider>
);
