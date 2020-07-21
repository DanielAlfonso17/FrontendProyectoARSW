import React, { Component } from "react";
import {ProductoService} from './service/ProductoService';
import UserService from "./service/UserService";
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Swal from 'sweetalert2'
export class BoardVendedor extends Component{
  constructor(){
    super();
    this.state= {content: ""}
    this.productoService = new ProductoService();

  }

  componentDidMount(){
    UserService.getVendedorBoard().then(
      (response) => {
        this.setState({
          content: response.data,
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
    this.listarProductosVendedor()
  }

  async remove(id){
    Swal.fire({
     title: 'Esta seguro de borrar el producto?',
     text: 'Borrara el producto del catalogo',
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Si!'
   }).then((result) => {
     if(result.value){
      this.productoService.delete(id)
      let updateProductos = [...this.state.productos].filter(i=>i.id !== id);
      this.setState({productos: updateProductos});
    }
    })
  }

  listarProductosVendedor(){
    this.productoService.getVendedor().then(data => {
      this.setState({ productos: data});
    });
  }

  mostrarProductos(){
    let path = "http://localhost:8080/vendedor/uploads/img/";
    if(this.state.productos){
      return this.state.productos.map((producto) =>{
        return (
              <tr key={producto.id}>
                <td><img src={path + producto.foto} alt={producto.foto} className="img-thumbnail rounded imagen"
                /></td>
                <td>{producto.descripcion}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>

                <td><Button className="btn btn-danger" onClick={() => this.remove(producto.id)}>Delete</Button></td>
                <td><Button className="btn btn-success" tag={Link} to={`/productos/${producto.id}`}>Editar</Button></td>
                <td><Button className="btn btn-warning"><Link to={`/chat/${producto.nombre}`}>Subastar</Link></Button></td>
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
          <Button color="primary" tag={Link} to="/productos/new" className="mt-2">Crear producto</Button>
          <div className="input-group mb-3">
            <table className="table table-responsive-lg table-borderedless table-striped my-4">
              <thead className="thead-dark">
                <tr>
                  <th>Foto</th>
                  <th>Descripcion</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Eliminar</th>
                  <th>Editar</th>
                  <th>Subastar</th>
                </tr>
              </thead>
              <tbody>
                {this.mostrarProductos()}
              </tbody>
            </table>

            </div>
        </header>
      </div>
    )
  }
}

export default BoardVendedor;
