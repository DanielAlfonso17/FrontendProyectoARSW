import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import UserService from "./service/UserService";

export class Home extends Component {
  constructor(props){
    super(props);

    this.state= {
      content: ""
    }
  }

  componentDidMount(){
    UserService.getPublicContent().then(
    response =>{
      this.setState({
        content: response.data
        })
        console.log(response.data)
      },
      error => {
        this.setState({
          content:
          (error.response && error.response.data) ||
          error.message || error.toString()
        })
      }
    )
  }
  render() {
    return (
      <div>
      <div className="container">

          <button className="btn btn-primary"><Link to="/productos">Ver productos</Link></button>
          <header className = "jumbotron">
            <h3>{this.state.content}</h3>
          </header>

      </div>
      </div>
    );
  }
}

export default Home;
