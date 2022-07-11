import { useRef, useEffect } from 'react';
import { songGsap } from 'lib/gsap';
import styles from './SongFrame.module.css';

const SongFrame = (props) => {
  const songEl = useRef();
  useEffect(() => {
    songGsap(songEl);
  }, [songEl]);

  return (
    <div id={styles['song-frame']}>
      {!props.songId && (
        <i id={styles['play-icon']} className='fa-solid fa-play'></i>
      )}

      {props.songId && (
        <iframe
          ref={songEl}
          width='1024'
          height='576'
          src={`https://www.youtube.com/embed/${props.songId}`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default SongFrame;
