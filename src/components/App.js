import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Tool from './Tool';
import Help from './Help';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
          <div className="">
            <Route exact path='/' component={Tool}/>
            <Route exact path='/help' component={Help}/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
