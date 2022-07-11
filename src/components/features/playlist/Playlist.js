import { useState, useEffect, useRef } from 'react';
import { playlistGsap } from 'lib/gsap';
import styles from './Playlist.module.css';

import PlaylistList from './PlaylistList';

const gcpKey = process.env.REACT_APP_GCP_API_KEY;
const playlistApi = process.env.REACT_APP_YOUTUBE_PLAYLIST_API;
const brightPl = 'PLCJnKGRxGnIAMSsC2GuS4RY9Zr9tANiSC';
const cloudyPl = 'PLCJnKGRxGnIDW23IpXYvHV60A1HjPZFU5';
const rainyPl = 'PLCJnKGRxGnIBAmCzLqCoXxUkSw7Xj6jVe';
const snowyPl = 'PLCJnKGRxGnIC-88RCYo9eRkdo8xJPFaE7';

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
      BdF: snowyPl,
      BnF: snowyPl,
      BdC: snowyPl,
      BnC: snowyPl,
      BdM: cloudyPl,
      BnM: cloudyPl,
      BdH: brightPl,
      BnH: brightPl,
      CdF: snowyPl,
      CnF: snowyPl,
      CdC: rainyPl,
      CnC: rainyPl,
      CdM: cloudyPl,
      CnM: cloudyPl,
      CdH: cloudyPl,
      CnH: cloudyPl,
      RdF: rainyPl,
      RnF: rainyPl,
      RdC: rainyPl,
      RnC: rainyPl,
      RdM: rainyPl,
      RnM: rainyPl,
      RdH: brightPl,
      RnH: brightPl,
      SdF: snowyPl,
      SnF: snowyPl,
      SdC: snowyPl,
      SnC: snowyPl,
      SdM: snowyPl,
      SnM: snowyPl,
      SdH: snowyPl,
      SnH: snowyPl,
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
