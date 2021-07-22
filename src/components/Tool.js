import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TrackingService from 'track-anything';
import M from 'materialize-css';



class Tool extends Component {
  defaultValues = {
    accountKey: '',
    applicationKey: 'demoApplication',
    eventType: 'demoTrack',
    eventValue: 'Test',
    executionTimes: '1',
    executionDelay: '0',
    output: '',
  }


  constructor(props) {
    super(props);
    this.state = { 
      running: false,
      remainingExecutionTimes: 0,
      ...this.defaultValues,
    }
  }

  componentDidMount() {
    let elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }

  render() {
    return (
      <div className="container">
            <h1 style={{ textAlign: 'center' }}>
                DS2G Data Generator
            </h1>
              <div className="row">
              <fieldset style={{ border: 'none', margin: '0', padding: '0'}} disabled={this.state.running}>
                      <div className="row">
                          <div className="input-field col s12">
                          <i className="material-icons prefix grey-text" onMouseOver={() => alert() }>info_outline</i>
                          <input id="accountKey" name="accountKey" type="text" className="validate" value={this.state.accountKey} onChange={evt => this.updateInputValue(evt)} required />
                          <label for="accountKey">Account Key</label>
                          </div>
                      </div>
                      <div class="row">
                          <div className="input-field col s6">
                          <i className="material-icons prefix grey-text" onMouseOver={() => alert() }>info_outline</i>
                          <input id="applicationKey" name="applicationKey" type="text" className="validate" value={this.state.applicationKey} onChange={evt => this.updateInputValue(evt)} required />
                          <label for="applicationKey">Applikation</label>
                          </div>
                          <div className="input-field col s6">
                          <i className="material-icons prefix grey-text" onMouseOver={() => alert() }>info_outline</i>
                          <input id="eventType" name="eventType" type="text" className="validate" value={this.state.eventType} onChange={evt => this.updateInputValue(evt)} required />
                          <label for="eventType">Eventtyp</label>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12">
                          <i className="material-icons prefix grey-text" onMouseOver={() => alert() }>info_outline</i>
                          <textarea id="eventValue" name="eventValue" className="materialize-textarea" value={this.state.eventValue} onChange={evt => this.updateInputValue(evt)} />
                          <label for="eventValue">Eventparameter</label>
                          </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s6">
                          <i className="material-icons prefix grey-text" onMouseOver={() => alert() }>info_outline</i>
                          <select id="executionTimes" name="executionTimes" value={this.state.eventValue} onChange={evt => this.updateInputValue(evt)}>
                            <option value="1">1x</option>
                            <option value="2">2x</option>
                            <option value="5">5x</option>
                            <option value="10">10x</option>
                            <option value="100">100x</option>
                          </select>
                          <label for="executionTimes">Anzahl der Ausführungen</label>
                        </div>
                        <div className="input-field col s6">
                          <i className="material-icons prefix grey-text" onMouseOver={() => alert() }>info_outline</i>
                          <select id="executionDelay" name="executionDelay" value={this.state.eventValue} onChange={evt => this.updateInputValue(evt)}>
                            <option value="0">Keine Verzögerung</option>
                            <option value="1">1 Sekunde</option>
                            <option value="5">5 Sekunden</option>
                            <option value="10">10 Sekunden</option>
                            <option value="60">60 Sekunden</option>
                          </select>
                          <label for="executionDelay">Verzögerung vor einem Track</label>
                        </div>
                      </div>
                      
                    </fieldset>
                      <div className="row">
                          <div className="input-field col s12">
                            {
                              this.state.running ? 
                              <button className="btn btn-flat btn-register red white-text right" onClick={ this.stopDemoTracking }>Stop
                                  <i className="material-icons right">stop</i>
                              </button>
                              :
                              <button className="btn btn-flat btn-register blue-grey white-text right" onClick={ this.runDemoTracking }>Run
                                  <i className="material-icons right">play_arrow</i>
                              </button>
                            }
                              <Link to="/" className="grey btn btn-flat right white-text" style={{ marginRight: '10px' }} onClick={() => this.resetValuesToDefault() }>Reset
                                  <i className="material-icons right">undo</i>
                              </Link>
                          </div>
                    </div>
                    <div className="row">
                          <div className="input-field col s12">
                          <h4>Output</h4>
                          <div id='outputText' style={{ border: '1px solid grey', padding: '10px', height: '300px' }}>
                            {
                              this.state.output.split("\n").map((i,key) => {
                                return i.length ? <div key={key}><span style={{color: 'grey'}}>#{key+1}: </span>{i}</div> : null;
                              })
                            }</div>
                          </div>
                    </div>
              </div>
        </div>
    );
  }

  updateInputValue(evt) {
    const elementId = evt.target.id;
    const state = {};
    state[elementId] = evt.target.value;
    this.setState(state);
  }

  resetValuesToDefault() {
    if (this.state.running) {
      this.stopDemoTracking();
    }
    this.setState(this.defaultValues);
  }

  sendTrack(_this) {
    if (_this.state.remainingExecutionTimes <= 0) {
      _this.stopDemoTracking();
      return;
    }

    const track = {
      // key: _this.state.accountKey, // not needed
      type: _this.state.eventType,
      applicationKey: _this.state.applicationKey,
      value: _this.state.eventValue,
    };

    TrackingService.sendGenericTrack(track);
    
    /* const trackingPixel = document.getElementsById('taTrackingPixel');
    if (trackingPixel) {
      trackingPixel = 
    }
    const img = document.createElement('img');
    img.src = 'http://tracking.zenpa.at';
    document.getElementsByTagName('html')[0].appendChild(img);

    */
    _this.setState({
      output: `${_this.state.output}${JSON.stringify(track)}\n`
    })

    _this.setState({
      remainingExecutionTimes: _this.state.remainingExecutionTimes - 1,
    })
  }

  runDemoTracking = () => {
    TrackingService.initialize(this.state.accountKey, true);

    this.setState({
      remainingExecutionTimes: this.state.executionTimes
    });
  
    const intervalId = setInterval(this.sendTrack, this.state.executionDelay * 1000, this);
    this.setState({
      running: true,
      executionIntervalId: intervalId,
    });
  }

  stopDemoTracking = () => {
    if (this.state.running) {
      clearInterval(this.state.executionIntervalId);
      this.setState({
        running: false,
        executionIntervalId: null,
        executionTimes: this.state.remainingExecutionTimes > 0 ? this.state.remainingExecutionTimes : this.state.executionTimes,
      });
    }
  }
}


/* 

componentDidUpdate() {
        let elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, {});
    }
    */

/*class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        inputValue: ''
      };
    }
  
    render() {
      return (
        //...
        <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
        //...
      );
    },
  
    updateInputValue(evt) {
      this.setState({
        inputValue: evt.target.value
      });
    }
  });

const Tool = () => {
    return (
        <div class="container">
            <h1 style={{ textAlign: 'center' }}>
                DS2G Data Generator
            </h1>
            <div class="row">
                    <div class="row">
                        <div class="input-field col s12">
                        <i class="material-icons prefix grey-text" onMouseOver={() => alert() }>info_outline</i>
                        <input id="accountKey" name="accountKey" type="text" class="validate" required />
                        <label for="accountKey">Account Key </label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                        <i class="material-icons prefix grey-text" onMouseOver={() => alert() }>info_outline</i>
                        <input id="applicationKey" name="applicationKey" type="text" class="validate" required />
                        <label for="applicationKey">Applikation</label>
                        </div>
                        <div class="input-field col s6">
                        <i class="material-icons prefix grey-text" onMouseOver={() => alert() }>info_outline</i>
                        <input id="eventType" name="eventType" type="text" class="validate" required />
                        <label for="eventType">Eventtyp</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                        <i class="material-icons prefix grey-text" onMouseOver={() => alert() }>info_outline</i>
                        <textarea id="eventValue" name="eventValue" class="materialize-textarea" />
                        <label for="eventValue">Eventparameter</label>
                        </div>
                    </div>
                    <div class="row">
                      <div class="input-field col s6">
                        <i class="material-icons prefix grey-text" onMouseOver={() => alert() }>info_outline</i>
                        <select id="executionTimes" name="executionTimes" >
                          <option value="" disabled selected>Choose your option</option>
                          <option value="1">Option 1</option>
                          <option value="2">Option 2</option>
                          <option value="3">Option 3</option>
                        </select>
                        <label for="executionTimes">Anzahl der Ausführungen</label>
                      </div>
                      <div class="input-field col s6">
                        <i class="material-icons prefix grey-text" onMouseOver={() => alert() }>info_outline</i>
                        <select id="executionDelay" name="executionDelay" >
                          <option value="" disabled selected>Choose your option</option>
                          <option value="1">Option 1</option>
                          <option value="2">Option 2</option>
                          <option value="3">Option 3</option>
                        </select>
                        <label for="executionDelay">Zeit zwischen den Ausführungen</label>
                      </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <button class="btn btn-flat btn-register blue-grey white-text right">Run
                                <i class="material-icons right">play_arrow</i>
                            </button>
                            <Link to="/" class="grey btn btn-flat right white-text" style={{ marginRight: '10px' }}>Stop
                                <i class="material-icons right">stop</i>
                            </Link>
                        </div>
                </div>
            </div>
        </div>
    );
}; */

export default Tool;
