import React, { Component } from 'react';
//import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Garden from './Garden';
import FlowerList from './FlowerList';
import FlowerEdit from './FlowerEdit';


//it calls our API to show the list of plants in flowergarden with properties:
class App extends Component {
  

  render() {
   
    return (
        <div className="App">
          <header className="App-header">
           
            <div className="App-intro">
              
              <h2>Welcome To My Garden</h2>
              <Router>
                <Switch>
                  <Route path='/' exact={true} component={Garden}/>
                  <Route path='/flowerslist' exact={true} component={FlowerList}/>
                  <Route path='/flowerslist/:plant_id' component={FlowerEdit}/>
                </Switch>
              </Router>
            </div>
    </header>
        </div>
    )
  }
}

export default App;


