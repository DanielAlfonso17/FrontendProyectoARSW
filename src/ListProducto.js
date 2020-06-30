import React, { Component } from 'react';
import {ProductoService} from './service/ProductoService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
export class ListProducto extends Component{
  constructor(){
    super();
    this.state = {busqueda: ''};
    this.productoService = new ProductoService();
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount(){
    this.listarProductos()
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
                <td><Button className="btn btn-danger" onClick={() => this.remove(producto.id)}>Delete</Button></td>
                <td><Button className="btn btn-success" tag={Link} to={`/productos/${producto.id}`}>Editar</Button></td>
              </tr>
        )
      })
    }
  }

  async remove(id){
    await this.productoService.delete(id)
    let updateProductos = [...this.state.productos].filter(i=>i.id !== id);
    this.setState({productos: updateProductos});

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
        console.log(data);
      })
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

  render(){
        return (
          <div>
            <input type="text" id="name" className="form-control w-100 mt-5" onChange={this.handleChange} placeholder="Buscar producto" aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <Button color="primary" tag={Link} to="/productos/new" className="mt-2">Crear producto</Button>
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
                    <th>Eliminar</th>
                    <th>Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {this.mostrarProductos()}
                </tbody>
              </table>

              </div>
            </div>
        )

  }

}

export default ListProducto;
