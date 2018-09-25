import React from 'react';
import { Button, Col } from 'reactstrap';
import Sound from 'react-sound';

const Beat = (props) => {
  return (
    <div className="mr-1 mb-1">
      <Button
        block
        className="content"
        color={props.color}
        active={props.active}
        onClick={() => { props.onClick(props.beatNumber - 1) }}
      >
        {props.beatNumber}
      </Button>
      <Sound
        url={props.audio}
        playStatus={props.active ? Sound.status.PLAYING : Sound.status.STOPPED}
      />
    </div>
  )
}

export default Beat;