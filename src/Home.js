import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';


export class Home extends Component {
  render() {
    return (
      <div className="container">

          <button class="btn btn-success"><Link to="/productos">Ver productos</Link></button>

      </div>
    );
  }
}

export default Home;
