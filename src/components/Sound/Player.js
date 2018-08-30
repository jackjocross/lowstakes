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
        marginBottom={-340}
        zIndex={1}
        color={COLOR.INVERSE}
        backgroundColor={COLOR.TERTIARY}
        fontFamily={SYSTEM_FONTS}
        media={[MIN_WIDTH, { marginBottom: -360 }]}
      >
        <Flex
          height={60}
          maxWidth="750px"
          margin="0 auto"
          padding={`0 ${GUTTER.LG}px`}
          justifyContent="space-between"
          alignItems="center"
          media={[MIN_WIDTH, { padding: 0, height: 40 }]}
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
