import React from 'react';
import PropTypes from 'prop-types';
import { Spring, animated } from 'react-spring';
import { FLIP } from '../../utils/constants';

export const AnimateAfterFlip = ({ flipping, from, to, children, ...rest }) => {
  if (flipping === FLIP.START) {
    return (
      <div style={from} {...rest}>
        {children}
      </div>
    );
  }

  if (flipping === FLIP.COMPLETE) {
    return (
      <Spring native from={from} to={to}>
        {style => (
          <animated.div style={style} {...rest}>
            {children}
          </animated.div>
        )}
      </Spring>
    );
  }

  return <>{children}</>;
};

AnimateAfterFlip.propTypes = {
  flipping: PropTypes.string.isRequired,
  from: PropTypes.shape({ transform: PropTypes.string.isRequired }).isRequired,
  to: PropTypes.shape({ transform: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node,
};
