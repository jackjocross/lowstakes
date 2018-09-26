import React from 'react';
import { Spring } from 'react-spring';

export const FadeInUp = props => (
  <Spring
    from={{ opacity: 0, transform: 'translate3d(0px, 15px, 0px)' }}
    to={{ opacity: 1, transform: 'translate3d(0px, 0px, 0px)' }}
  >
    {style => <div style={style} {...props} />}
  </Spring>
);
