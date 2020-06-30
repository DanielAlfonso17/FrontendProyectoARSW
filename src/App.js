import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ListProducto } from './ListProducto';
import { Home } from './Home';
import { EditProducto } from './EditProducto'



export class App extends Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/productos' exact={true} component={ListProducto}/>
          <Route path='/productos/:id' component={EditProducto}/>
        </Switch>

      </Router>
    )
  }

}

export default App;
