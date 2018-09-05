import React from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';
import { SoundPlayer } from './Player';

export const SoundContext = React.createContext({});

export class SoundProvider extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  state = {
    playStatus: Sound.status.STOPPED,
  };

  setTrack = track => this.setState(track);

  play = () => this.setState({ playStatus: Sound.status.PLAYING });

  pause = () => this.setState({ playStatus: Sound.status.PAUSED });

  render() {
    const { children } = this.props;
    const { url, title, artist, playStatus } = this.state;

    return (
      <>
        <SoundContext.Provider
          value={{
            url,
            title,
            artist,
            playStatus,
            setTrack: this.setTrack,
            play: this.play,
            pause: this.pause,
          }}
        >
          {children}
          <SoundPlayer />
        </SoundContext.Provider>
        <Sound url={url} playStatus={playStatus} />
      </>
    );
  }
}
