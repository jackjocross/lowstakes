import React from 'react';
import { FONT_SIZE, MIN_WIDTH } from '../utils/constants';

export const Card = ({ css, ...rest }) => (
  <div
    css={{
      background: '#fff',
      overflow: 'hidden',
      borderRadius: '0',
      borderWidth: '1px 0',
      borderStyle: 'solid',
      borderColor: '#eaecee',
      fontSize: FONT_SIZE.MD,
      [MIN_WIDTH]: {
        borderRadius: '3px',
        borderWidth: '1px',
        fontSize: FONT_SIZE.LG,
      },
    }}
    {...rest}
  />
);
