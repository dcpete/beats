import React, { Component } from 'react';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';

import Beat from './Beat';
import HighClick from '../assets/audio/high.wav';
import LowClick from '../assets/audio/low.wav';

class App extends Component {
  constructor() {
    super();
    this.handleBeatClick = this.handleBeatClick.bind(this);
    this.handleCleanup = this.handleCleanup.bind(this);
    this.handleInterval = this.handleInterval.bind(this);

    this.state = {
      bpm: 120,
      maxBpm: 600,
      numberOfBeats: 24,
      beatState: [],
      beatColors: [
        'secondary',
        'info',
        'warning'
      ],
      beatAudio: [
        null,
        new Audio(LowClick),
        new Audio(HighClick)
      ],
      intervalId: undefined,
      activeBeat: []
    }
  }

  handleCleanup() {
    this.state.intervalId && clearInterval(this.state.intervalId);
  }

  componentDidMount(){
    window.addEventListener('beforeunload', this.handleCleanup);
  }

  componentWillUnmount() {
    this.handleCleanup();
    window.removeEventListener('beforeunload', this.handleCleanup);
}

  handleBeatClick(index) {
    const beatState = this.state.beatState.slice();
    beatState[index] = index < beatState.length && beatState[index]
      ? (beatState[index] + 1) % this.state.beatColors.length
      : 1
    this.setState({ beatState });
  }

  handleInterval() {
    const activeBeat = this.state.activeBeat.slice(-1).concat(this.state.activeBeat.slice(0, -1));
    const beatIndex = activeBeat.indexOf(true);
    const beatAudioIndex = beatIndex < this.state.beatState.length && this.state.beatState[beatIndex]
    beatAudioIndex > 0 && this.state.beatAudio[beatAudioIndex].play();
    this.setState({
      activeBeat
    })
  }
  
  renderBeats() {
    const { numberOfBeats, beatState, beatColors, beatAudio } = this.state;
    const beatArray = [];
    for (var i = 0; i < numberOfBeats; i++) {
      const color = i < beatState.length
        ? beatColors[beatState[i]]
        : beatColors[0];
      const active = this.state.isPlaying && this.state.activeBeat[i];
      beatArray.push(
        <Col xs='3' md='2' className="square">
          <Beat
            color={color}
            onClick={this.handleBeatClick}
            active={active}
            beatNumber={i + 1}
          />
        </Col>
      )
    }
    return beatArray;
  }

  render() {
    return (
      <div>
        <main>
          <div className="container">
            <FormGroup row className="align-items-end">
              <Col xs='4'>
              <Label for="bpm">bpm</Label>
              <Input
                name="bpm"
                type="text"
                value={this.state.bpm}
                disabled={this.state.isPlaying}
                onChange={event => {
                  const val = parseInt(event.target.value);
                  !val || (Number.isInteger(val) && val <= this.state.maxBpm)
                    ? this.setState({ bpm: event.target.value })
                    : event.preventDefault();
                }}
                />
              </Col>
              <Col xs='4'>
                <Button
                  block
                  onClick={() => {
                    if (this.state.isPlaying) {
                      this.handleCleanup();
                      this.setState({ isPlaying: false })
                    }
                    else if (this.state.bpm && this.state.numberOfBeats) {
                      const intervalLength = 60000 / this.state.bpm;
                      for (var i = 1; i < this.state.beatAudio.length; i++) {
                        const duration = this.state.beatAudio[i].duration;
                        const ratio = (duration * 1000) / (intervalLength - 100);
                        this.state.beatAudio[i].playbackRate = Math.max(1, ratio);
                      }

                      const activeBeat = [];
                      activeBeat[this.state.numberOfBeats - 1] = null;
                      activeBeat[0] = true;
                      this.state.beatState[0] > 0 && this.state.beatAudio[this.state.beatState[0]].play();
                      
                      this.setState({
                        isPlaying: true,
                        intervalId: setInterval(this.handleInterval, intervalLength),
                        activeBeat
                      });
                    }
                  }}
                >
                  {this.state.isPlaying ? "Stop" : "Start"}
                </Button>
              </Col>
              <Col xs='4'>
                <Label for="numberOfBeats">beats</Label>
                <Input
                  name="numberOfBeats"
                  type="text"
                  value={this.state.numberOfBeats}
                  disabled={this.state.isPlaying}
                  onChange={event => {
                    const val = parseInt(event.target.value);
                    !val || Number.isInteger(val)
                      ? this.setState({ numberOfBeats: event.target.value })
                      : event.preventDefault();
                  }}
                />
              </Col>
            </FormGroup>
            <Row className="no-gutters">
              {this.renderBeats(this.state.numberOfBeats)}
            </Row>
          </div>
        </main>
      </div>
    )
  }
}

export default App;