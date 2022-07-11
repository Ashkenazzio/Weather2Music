import styles from './PlaylistItem.module.css';

const PlaylistItem = (props) => {
  const setNewSong = () => {
    props.setSongId(props.id);
  };

  return (
    <li onClick={setNewSong} id={props.id} className={styles['playlist__item']}>
      <h4 className={styles['song-title']}>{props.title}</h4>
      <div className={styles['thumb-wrapper']}>
        <img
          className={styles['vid-thumb']}
          src={props.imgSrc}
          alt='video thumbnail'
        />
      </div>
    </li>
  );
};

export default PlaylistItem;
