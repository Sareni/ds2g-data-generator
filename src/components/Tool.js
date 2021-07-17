import React from 'react';
import { Link } from 'react-router-dom';
import TrackingService from 'track-anything';



const sendTrack = () => {
  TrackingService.initialize();
  TrackingService.sendGenericTrack();
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
  }); */

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
};

export default Tool;
