import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

import Beat from './Beat';

class App extends Component {
  constructor() {
    super();

    this.state = {
      numberOfBeats: 8
    }
  }
  
  renderBeats(numberOfBeats) {
    const beatArray = [];
    for (var i = 0; i < numberOfBeats; i++) {
      beatArray.push(
        <Col xs='3' md='2' className="square">
          <Beat
            color="secondary"
            onClick={() => { }}
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
        <header>
          <div className="container">
            beats
          </div>
        </header>
        <main>
          <div className="container">
            main window
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