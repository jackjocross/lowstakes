import React from 'react';
import { Block, Flex } from 'glamor/jsxstyle';
import posed from 'react-pose';
import { GoPlaybackPause, GoPlaybackPlay } from 'react-icons/lib/go';
import { SoundContext } from './Provider';
import { GUTTER, MIN_WIDTH, COLOR, SYSTEM_FONTS } from '../../utils/constants';

const SlideUp = posed.div({
  visible: {
    y: '0px',
  },
  hidden: { y: '100px' },
});

export const SoundPlayer = () => (
  <SoundContext.Consumer>
    {({ title, url, playStatus, play, pause }) => (
      <Block
        component={SlideUp}
        pose={url ? 'visible' : 'hidden'}
        bottom={0}
        position="fixed"
        width="100%"
        height={400}
        marginBottom={-360}
        zIndex={1}
        color={COLOR.INVERSE}
        backgroundColor={COLOR.TERTIARY}
        fontFamily={SYSTEM_FONTS}
      >
        <Flex
          height={40}
          maxWidth="750px"
          margin="0 auto"
          padding={`0 ${GUTTER.LG}px`}
          media={[MIN_WIDTH, { padding: 0 }]}
          justifyContent="space-between"
          alignItems="center"
        >
          <Block>{title}</Block>
          <Block cursor="pointer">
            {playStatus === 'PLAYING' ? (
              <GoPlaybackPause size={30} onClick={pause} />
            ) : (
              <GoPlaybackPlay size={30} onClick={play} />
            )}
          </Block>
        </Flex>
      </Block>
    )}
  </SoundContext.Consumer>
);
