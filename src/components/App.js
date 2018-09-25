import React, { Component } from 'react';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';

import Beat from './Beat';

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
    this.setState({
      activeBeat: this.state.activeBeat.slice(-1).concat(this.state.activeBeat.slice(0, -1))
    })
  }
  
  renderBeats() {
    const { numberOfBeats, beatState, beatColors } = this.state;
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
                    else if (this.state.bpm) {
                      const activeBeat = [];
                      activeBeat[this.state.numberOfBeats - 1] = null;
                      activeBeat[0] = true;
                      this.setState({
                        isPlaying: true,
                        intervalId: setInterval(this.handleInterval, 60000 / this.state.bpm),
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