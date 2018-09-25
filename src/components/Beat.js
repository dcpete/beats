import React from 'react';
import { Button, Col } from 'reactstrap';

const Beat = (props) => {
  return (
    <div className="mr-1 mb-1">
      <Button
        block
        className="content"
        color={props.color}
        onClick={props.onClick}
      >
        {props.beatNumber}
      </Button>
    </div>
  )
}

export default Beat;