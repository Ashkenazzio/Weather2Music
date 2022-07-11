import { useRef, useLayoutEffect } from 'react';
import { listGsap } from 'lib/gsap';
import styles from './PlaylistList.module.css';

import PlaylistItem from './PlaylistItem';

const PlaylistList = (props) => {
  const listEl = useRef();
  useLayoutEffect(() => {
    listGsap(listEl);
  }, [listEl]);

  return (
    <ul ref={listEl} className={styles['playlist__list']}>
      {props.playlist
        .filter((song) => song.snippet.thumbnails.high !== undefined)
        .map((song) => (
          <PlaylistItem
            setSongId={props.setSongId}
            id={song.snippet.resourceId.videoId}
            key={song.snippet.resourceId.videoId}
            title={song.snippet.title}
            imgSrc={song.snippet.thumbnails.high.url}
          />
        ))}
    </ul>
  );
};

export default PlaylistList;
