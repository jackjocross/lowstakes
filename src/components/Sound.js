import React from 'react';
import Sound from 'react-sound';

export const SoundContext = React.createContext();

export class SoundProvider extends React.Component {
  state = {
    playStatus: Sound.status.STOPPED,
  };

  setUrl = url => this.setState({ url });
  play = () => this.setState({ playStatus: Sound.status.PLAYING });
  pause = () => this.setState({ playStatus: Sound.status.PLAYING });

  render() {
    const { children } = this.props;
    const { url, playStatus } = this.state;
    return (
      <>
        <SoundContext.Provider
          value={{
            url,
            playStatus,
            setUrl: this.setUrl,
            play: this.play,
            pause: this.pause,
          }}
        >
          {children}
        </SoundContext.Provider>
        <Sound url={url} playStatus={playStatus} />
      </>
    );
  }
}
