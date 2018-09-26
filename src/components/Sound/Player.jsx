import React from 'react';
import { Spring } from 'react-spring';
import { GoPlaybackPause, GoPlaybackPlay } from 'react-icons/lib/go';
import { SoundContext } from './Provider';
import { GUTTER, COLOR, SYSTEM_FONTS, MIN_WIDTH } from '../../utils/constants';

export const SoundPlayer = () => (
  <SoundContext.Consumer>
    {({ title, url, playStatus, play, pause }) =>
      url ? (
        <Spring
          from={{ opacity: 0, transform: 'translate3d(0px, 60px, 0px)' }}
          to={{ opacity: 1, transform: 'translate3d(0px, 0px, 0px)' }}
        >
          {style => (
            <div
              style={style}
              css={{
                bottom: 0,
                position: 'fixed',
                width: '100%',
                zIndex: 1,
                color: COLOR.INVERSE,
                backgroundColor: COLOR.TERTIARY,
                fontFamily: SYSTEM_FONTS,
              }}
            >
              <div
                css={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  maxWidth: 750,
                  margin: '0 auto',
                  padding: GUTTER.SM,
                  width: `calc(100% - ${2 * GUTTER.SM}px)`,
                  [MIN_WIDTH]: {
                    padding: `${GUTTER.SM}px 0`,
                    width: '100%',
                  },
                }}
              >
                <div>{title}</div>
                <div css={{ cursor: 'pointer' }}>
                  {playStatus === 'PLAYING' ? (
                    <GoPlaybackPause size={30} onClick={pause} />
                  ) : (
                    <GoPlaybackPlay size={30} onClick={play} />
                  )}
                </div>
              </div>
            </div>
          )}
        </Spring>
      ) : null
    }
  </SoundContext.Consumer>
);
