
import React, { Component } from "react";
import PubSub from 'pubsub-js';
import Input from 'react-validation/build/input'

const required = value => {
  if(!value){
    return(
      <div className="alert alert-danger" role="alert">
        Este campo es necesario
      </div>
    )
  }
}

class Carrito extends Component{
  facturaVacia={
    "descripcion": "",
    "observacion": "",
    "productos": []
  }

  constructor(props){
    super(props)
    this.state = {
      factura: this.facturaVacia,
      cart: [],
      total: 0
    }
    this.handleAumentarCantidad = this.handleAumentarCantidad.bind(this);

  }

  componentDidMount(){

    this.setState({
      cart:this.props.location.state.producto
    })

  }

  mostrarProductosCarrito(){
    let path = "https://offerbuy-arsw.herokuapp.com/comprador/uploads/img/";
    if(this.state.cart){
      return this.state.cart.map((producto) =>{
        return(
          <tr key={producto.id}>
            <td><img src={path + producto.foto} alt={producto.foto} className="img-thumbnail rounded imagen"
            /></td>
            <td>{producto.nombre}</td>
            <td>{producto.precio}</td>
            <td><input type="number" value={producto.cantidad} onChange={(evento) => this.handleAumentarCantidad(evento,producto.id)} className="form-control col-sm-4"/></td>
            <td>{producto.precio * producto.cantidad}</td>
            <td><button className="btn btn-danger btn-sm" type="button" onClick={() => this.eliminarItemCarrito(producto.id)}>x</button></td>
          </tr>
        )
      })
    }
  }

  eliminarItemCarrito(id){
    this.setState({
      cart: this.state.cart.filter((producto) => id !== producto.id)
    })
  }

  handleAumentarCantidad(event, id){
    event.preventDefault();
    let cantidad = event.target.value;
    if(cantidad == 0){
      this.eliminarItemCarrito(id);
    }
    this.state.cart.map( producto => {
      if(id === producto.id){
        producto["cantidad"] = cantidad;
      }
      return producto
    })


  }

  calcularTotal(){
    let tot = 0;
    if(this.state.cart){
      this.state.cart.map((producto) =>{
        tot += (producto.precio*producto.cantidad)
      })
    }
    return tot;
  }

  crearFactura(){

  }


  render(){
    return(
      <div className="container-sm my-5">
        <h2>Carrito</h2>
        {this.state.cart.length == 0 ?
        <div className="alert alert-danger" role="alert">
          El carrito esta vacio
        </div> : (
        <table className="table table-striped table-hover table-sm">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {this.mostrarProductosCarrito()}
          </tbody>
          </table>

        )}

        <h3 className="float-right">Total: {this.calcularTotal()}</h3>
        <br/>
        <button className="btn btn-success">Crear Factura</button>
      </div>
    )
  }
}

export default Carrito;
