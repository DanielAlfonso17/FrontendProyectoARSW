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
    this.state = {busqueda: '', comprador: false, carrito:[],precioInicial: 0, precioFinal:0};
    this.productoService = new ProductoService();
    this.handleChange = this.handleChange.bind(this);
    this.addProductoCarrito = this.addProductoCarrito.bind(this);
    this.handleChangePrecioFinal = this.handleChangePrecioFinal.bind(this);
    this.handleChangePrecioInicial = this.handleChangePrecioInicial.bind(this);
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
    let path = "https://offerbuy-arsw.herokuapp.com/comprador/uploads/img/";
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
                {this.state.comprador && (<td><Button className="btn btn-success" onClick={() => this.addProductoCarrito(producto)}>Añadir al carrito</Button></td>)}
                {this.state.comprador && (<td><Link  className="btn btn-warning" to={`/chat/${producto.nombre}/${producto.precio}`}>Entrar</Link></td>)}
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

      })
    }
  }

  addProductoCarrito(producto){
    if(this.existeProductoCarrito(producto)){
      let posicion = this.state.carrito.indexOf(producto);
      let prod = this.state.carrito[posicion]
      producto["cantidad"]+=1;
    }else{
      producto["cantidad"] = 1
      this.setState({
          carrito: this.state.carrito.concat(producto)
      })
    }
  }



  existeProductoCarrito(producto){
    if(this.state.carrito.includes(producto)){
      return true;
    }else{
      return false;
    }
  }

  listaProductosRangoPrecios(){
    if(this.state.precioFinal !== 0 && this.state.precioInicial !== 0){

      this.productoService.listarProductoPrecios(this.state.precioInicial,this.state.precioFinal).then((value) => {console.log(value)})

    }

  }

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

  handleChangePrecioInicial(event){
    const target = event.target;
    const value = target.value;
    this.setState({precioInicial: value});
    console.log(this.state.precioInicial);
  }

  handleChangePrecioFinal(event){
    const target = event.target;
    const value = target.value;
    this.setState({precioFinal: value});
    console.log(this.state.precioFinal);
  }

  render(){
        return (
          <div className="container">
          {this.listaProductosRangoPrecios()}
          {this.state.comprador && (<Link to={{ pathname: "/carrito",
                      search: '?query=abc',
                      state: {producto: this.state.carrito}}} className="btn btn-danger"> Ver carrito </Link>
                      )}
            <div className="container">
            <input type="text" id="name" className="form-control w-100 mt-5" onChange={this.handleChange} placeholder="Buscar producto" aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <input type="number" id="name" className="form-control w-25 mt-5 float-left" onChange={this.handleChangePrecioInicial} placeholder="Precio Inicial" aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <input type="number" id="name" className="form-control w-25 mt-5 float-left" onChange={this.handleChangePrecioFinal} placeholder="Precio Final" aria-label="Recipient's username" aria-describedby="button-addon2"/>
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
                    {this.state.comprador && (<th>Subasta</th>)}
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
