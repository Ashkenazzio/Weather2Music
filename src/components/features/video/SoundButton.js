import { useState } from 'react';
import useAudio from 'hooks/useAudio';

import Button from 'components/ui/Button';

const SoundButton = (props) => {
  const [icon, setIcon] = useState(String.fromCharCode(0xf027));

  const [playing, toggle] = useAudio(
    require(`assets/audio/${props.audio}.mp3`).default
  );
  const changeIconHandler = () => {
    if (!playing) {
      setIcon(String.fromCharCode(0xf6a9));
      return;
    }
    setIcon(String.fromCharCode(0xf027));
  };

  return (
    <Button
      id={props.id}
      icon={icon}
      onClick={() => {
        toggle();
        changeIconHandler();
      }}
    >
      {props.children}
    </Button>
  );
};

export default SoundButton;
