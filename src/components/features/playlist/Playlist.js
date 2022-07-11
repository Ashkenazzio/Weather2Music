import { useState, useEffect, useRef } from 'react';
import { playlistGsap } from 'lib/gsap';
import styles from './Playlist.module.css';

import PlaylistList from './PlaylistList';

const gcpKey = process.env.REACT_APP_GCP_API_KEY;
const playlistApi = process.env.REACT_APP_YOUTUBE_PLAYLIST_API;

const Playlist = (props) => {
  const playlistEl = useRef();
  useEffect(() => {
    playlistGsap(playlistEl);
  }, [playlistEl]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.moodCode) {
      pickPlaylist(props.moodCode);
    }
  }, [props.moodCode]);

  const pickPlaylist = (moodCode) => {
    const moodCodeCase = {
      BdF: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      BnF: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      BdC: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      BnC: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      BdM: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      BnM: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      BdH: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      BnH: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      CdF: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      CnF: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      CdC: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      CnC: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      CdM: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      CnM: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      CdH: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      CnH: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      RdF: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      RnF: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      RdC: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      RnC: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      RdM: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      RnM: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      RdH: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      RnH: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      SdF: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      SnF: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      SdC: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      SnC: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      SdM: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      SnM: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      SdH: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
      SnH: 'PLW9z2i0xwq0F3-8LieqflLLWLWZQgvhEX',
    };

    const playlistId = moodCodeCase[moodCode];
    fetchPlaylist(playlistId);
  };

  const fetchPlaylist = async (playlistId) => {
    setIsLoading(true);
    let url = `${playlistApi}&playlistId=${playlistId}&key=${gcpKey}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      pickSong(data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert('Something went wrong! Try again later');
    }
  };

  const pickSong = (data) => {
    const items = data.items;
    const item = items[Math.floor(Math.random() * items.length)];
    const itemId = item.snippet.resourceId.videoId;
    props.setSongId(itemId);
    props.setPlaylist(items);
    excludePlaying(items, itemId);
  };

  const excludePlaying = (items, itemId) => {
    const itemIdx = items.findIndex(
      (item) => item.snippet.resourceId.videoId === itemId
    );

    items.splice(itemIdx, 1);
    const filteredPlaylist = items;

    showPlaylist(filteredPlaylist);
  };

  const showPlaylist = (playlist) => {
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    shuffle(playlist);
    setIsLoading(false);
  };

  console.log('playlist rendered');
  return (
    <aside ref={playlistEl} className={`${styles.playlist} glass`}>
      <h3>Browse Playlist:</h3>
      {!isLoading && props.playlist.length > 0 && (
        <PlaylistList setSongId={props.setSongId} playlist={props.playlist} />
      )}
      {isLoading && <p>Loading...</p>}
    </aside>
  );
};

export default Playlist;
