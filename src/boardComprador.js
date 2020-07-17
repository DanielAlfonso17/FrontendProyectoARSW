import React, { Component } from "react";

import UserService from "./service/UserService";

class BoardComprador extends Component{
  constructor(props){
      this.state = {
        content: ""
      };
  }

  componentDidMount(){
    UserService.getCompradorBoard().then(
      (response) => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content: (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
      }
    )
  }

  render(){
    return({
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    })
  }
}

export default BoardComprador;
