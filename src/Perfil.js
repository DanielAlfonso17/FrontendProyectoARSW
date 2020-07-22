import React, { Component } from "react";
import AuthService from "./service/AuthService";
import {ProductoService} from "./service/ProductoService";

export class Perfil extends Component{
  constructor(props){
    super(props);
    this.productoService = new ProductoService();
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      comprador: false,
      vendedor: false,
      usuario: ""
    }

  }

  componentDidMount(){
    this.setState({
      comprador: this.state.currentUser.roles.includes("ROLE_COMPRADOR"),
      vendedor: this.state.currentUser.roles.includes("ROLE_VENDEDOR")
    })
  }

  render(){
    const { currentUser } = this.state;
    return(

      <div className="container">
        <header className="jumbotron">
          {this.state.comprador ? (<h3>
            <strong>{currentUser.username} Perfil Comprador</strong>
          </h3>):(<h3>
            <strong>{currentUser.username} Perfil Vendedor</strong>
          </h3>)}
        </header>
        <p>
          <strong>Token: </strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length -20)}
        </p>
        <strong>Rol: </strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role,index) => <li key={index}>{role}</li>)}
        </ul>
        <strong>email: {currentUser.email} </strong>
      </div>
    )
  }
}

export default Perfil;
