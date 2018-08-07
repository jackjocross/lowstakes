import React from 'react';
import Sound from 'react-sound';

export const SoundContext = React.createContext();

export class SoundProvider extends React.Component {
  state = {
    sound: {
      url:
        '//assets.ctfassets.net/rzzqdlsaa3kz/tNm7oTLBIc0QQUAice88Y/b7067fd765ccffec50f6d6d6130679f5/ACDC_-_Touch_Too_Much__Official_Video_.mp3',
      playStatus: Sound.status.STOPPED,
    },
  };

  setSound = sound => this.setState({ sound });

  render() {
    const { children } = this.props;
    const { sound } = this.state;
    return (
      <>
        <SoundContext.Provider value={{ sound, setSound: this.setSound }}>
          {children}
        </SoundContext.Provider>
        <Sound {...sound} />
      </>
    );
  }
}
