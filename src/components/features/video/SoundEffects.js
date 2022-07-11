import styles from './SoundEffects.module.css';
import SoundButton from './SoundButton';

const SoundEffects = () => {
  return (
    <div className={styles['sound-effects']}>
      <h3>Add background sounds to further set the mood:</h3>
      <div className={styles['sound-effects__btns']}>
        <SoundButton id='rain-btn' audio='rain'>
          Rain
        </SoundButton>

        <SoundButton id='birds-btn' audio='birdsong'>
          Birdsong
        </SoundButton>
      </div>
    </div>
  );
};

export default SoundEffects;
