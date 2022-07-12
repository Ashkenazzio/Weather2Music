import React, { useState } from 'react';

import styles from './Main.module.css';
import Weather from 'components/features/weather/Weather';
import VideoContainer from 'components/features/video/VideoContainer';
import Playlist from 'components/features/playlist/Playlist';

const Main = (props) => {
  const [playlist, setPlaylist] = useState([]);
  const [songId, setSongId] = useState();
  const [moodCode, setMoodCode] = props.moodCode;

  return (
    <main>
      <Weather setMoodCode={setMoodCode} />
      <VideoContainer songId={songId} playlist={playlist} />
      <Playlist
        moodCode={moodCode}
        playlist={playlist}
        setPlaylist={setPlaylist}
        setSongId={setSongId}
      />
    </main>
  );
};

export default Main;
