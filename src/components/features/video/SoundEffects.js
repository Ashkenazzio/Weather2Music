import styles from './SoundEffects.module.css';
import SoundButton from './SoundButton';

const SoundEffects = () => {
  return (
    <div className={styles['sound-effects']}>
      <h3>Add background sounds to further set the mood:</h3>
      <div className={styles['sound-effects__btns']}>
        <SoundButton audio='rain'>Rain</SoundButton>
        <SoundButton audio='birdsong'>Birdsong</SoundButton>
        <SoundButton audio='ocean'>Ocean</SoundButton>
        <SoundButton audio='restaurant'>Restaurant</SoundButton>
      </div>
    </div>
  );
};

export default SoundEffects;
