import React, { Component } from "react";
import ProductoService from './service/ProductoService'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
class ProductosVendedor extends Component{
  constructor(props){
    super(props);

    this.state={
      productos:[],
      vendedor: ""
    }
  }

    componentDidMount(){
      this.setState({
        productos: this.props.location.state.vendedor.productos,
        vendedor: this.props.location.state.vendedor.nombre
      })
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
                </tr>
          )
        })
      }
    }

    render(){
      return(
        <div className="container">
        <strong>Vendedor: {this.state.vendedor}</strong>
        <table className="table table-responsive-lg table-borderedless table-striped my-4">
          <thead className="thead-dark">
            <tr>
              <th>Foto</th>
              <th>Descripcion</th>
              <th>Nombre</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {this.mostrarProductos()}
          </tbody>
        </table>

        </div>
      )
    }
}

export default ProductosVendedor;
