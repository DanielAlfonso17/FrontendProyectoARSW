import React, { Component } from "react";
import Swal from 'sweetalert2'
import {ProductoService} from './service/ProductoService';
import UserService from "./service/UserService";
import CompradorService from './service/CompradorService';
import { Link } from 'react-router-dom';

class BoardComprador extends Component{
  constructor(props){
    super(props);
      this.state = {busqueda: "",content: ""};
      this.productoService = new ProductoService();
      this.compradorService = new CompradorService();
      this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.facturasComprador();
    this.listarVendedores();
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

  handleChange(event){
    const target = event.target;
    const value = target.value;
    this.setState({ vendedor: value })
    console.log(value)
    if(value !== ''){
        this.vendedoresNombre(this.state.vendedor)
    }else{
      this.listarVendedores();
    }
  }

  facturasComprador(){
    this.productoService.getComprador().then((value) => {console.log(value.email)})
  }

  vendedoresNombre(nombre){
    if(nombre != null && nombre !== ""){
      this.compradorService.getVendedorNombre(nombre).then(data => {
        this.setState( { vendedores: data } )
      })
      console.log(this.state.vendedores)
    }
  }

  listarVendedores(){
    this.compradorService.getVendedores().then((value) => this.setState({
      vendedores: value
    }))
  }

  mostrarVendedor(){
    if(this.state.vendedores){
      return this.state.vendedores.map((vendedor) =>{
        return (
              <tr key={vendedor.id}>
                <td>{vendedor.nombre}</td>
                <td>{vendedor.email}</td>
                <td><button className="btn btn-warning"><Link to={`/chat/${vendedor.nombre}`}>Contactar</Link></button></td>
              </tr>
        )
      })
    }
  }

  render(){
    return(
      <div className="container">

        <header className="jumbotron">
          <h3>{this.state.content}</h3>
          <input type="text" id="name" className="form-control w-100 mt-5" onChange={this.handleChange} placeholder="Buscar Vendedor" aria-label="Recipient's username" aria-describedby="button-addon2"/>
          <table className="table table-responsive-lg table-borderedless table-striped my-4">
            <thead className="thead-dark">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Contacto</th>
              </tr>
            </thead>
            <tbody>
              {this.mostrarVendedor()}
            </tbody>
            </table>
        </header>
      </div>
    )
  }
}

export default BoardComprador;
