import React, { Component } from 'react';
import {ProductoService} from './service/ProductoService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Swal from 'sweetalert2'
import AuthService from './service/AuthService';
import Carrito from './Carrito';
import PubSub from 'pubsub-js';

export class ListProducto extends Component{
  constructor(props){
    super(props);
    this.state = {busqueda: '', comprador: false, carrito:[]};
    this.productoService = new ProductoService();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.listarProductos()
    const user = AuthService.getCurrentUser();
    if(user){
      this.setState({
        comprador: user.roles.includes("ROLE_COMPRADOR")        
      })
    }
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
                <td>{producto.vendedor.nombre}</td>
                {this.state.comprador && (<td><Button className="btn btn-success" onClick={() => {PubSub.publish('add',producto)}}>Añadir al carrito</Button></td>)}
                {this.state.comprador && (<td><Button className="btn btn-warning"><Link to={`/chat/${producto.nombre}`}>Entrar</Link></Button></td>)}
              </tr>
        )
      })
    }
  }

  listarProductos(){
    this.productoService.getAll().then(data => {
      this.setState({ productos: data});
    });
  }

  listarProductosPalabra(palabra){
    if(palabra != null && palabra !== ""){
      this.productoService.getByNombre(palabra).then(data => {
        this.setState( { productos: data } )
      })
    }
  }

  /**addProductoCarrito(){
    this.setState({
      carrito: this.state.carrito.concat(producto)
    })
    PubSub.publish('cart.add', this.state.carrito)

  }*/


  handleChange(event){
    const target = event.target;
    const value = target.value;
    this.setState({busqueda: value});
    if(value !== ''){
        this.listarProductosPalabra(this.state.busqueda);
    }else{
        this.listarProductos();
    }


  }

  render(){
        return (

          <div>
            <div className="container">
            <Carrito />
            <input type="text" id="name" className="form-control w-100 mt-5" onChange={this.handleChange} placeholder="Buscar producto" aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <div className="input-group-append mt-3">

            </div>
            <div className="input-group mb-3">
              <table className="table table-responsive-lg table-borderedless table-striped my-4">
                <thead className="thead-dark">
                  <tr>
                    <th>Foto</th>
                    <th>Descripcion</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Vendedor</th>
                    {this.state.comprador && (<th>Añadir</th>)}
                  </tr>
                </thead>
                <tbody>
                  {this.mostrarProductos()}
                </tbody>
              </table>
              </div>
            </div>

            </div>
        )

  }

}

  export default ListProducto;
