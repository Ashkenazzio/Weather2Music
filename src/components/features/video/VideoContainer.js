import { useEffect, useRef } from 'react';
import useObserver from 'hooks/useObserver';
import { videoGsap } from 'lib/gsap';
import styles from './VideoContainer.module.css';

import SongFrame from './SongFrame';
import SoundEffects from './SoundEffects';

const VideoContainer = (props) => {
  const videoContainer = useRef();
  useObserver(videoContainer);

  useEffect(() => {
    videoGsap(videoContainer);
  }, [videoContainer]);

  return (
    <section
      ref={videoContainer}
      className={`${styles['video-container']} glass`}
    >
      <SongFrame playlist={props.playlist} songId={props.songId} />
      <SoundEffects />
    </section>
  );
};

export default VideoContainer;
