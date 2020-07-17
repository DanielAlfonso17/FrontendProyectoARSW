import React, { Component } from "react";

import UserService from "./service/UserService";

export class BoardVendedor extends Component{
  constructor(props){
    super(props);
    this.state= {
      content: ""
    };
  }

  componentDidMount(){
    UserService.getVendedorBoard().then(
      (response) => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
          (error.response && error.response.data && error.response.data.message) ||
          error.message || error.toString()
        });
      }
    )
  }

  render(){
    return({
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
          hola si
        </header>
      </div>
    })
  }
}

export default BoardVendedor;
