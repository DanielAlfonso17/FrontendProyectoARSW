
import React, { Component } from "react";
import PubSub from 'pubsub-js';

class Carrito extends Component{
  constructor(props){
    super(props)
    this.state = {
      cart: []
    }
  }

  componentWillMount(){
    PubSub.subscribe('add', (topic,items) => {
      items["cantidad"] = 1
      if(this.state.cart.includes(items)){
        items["cantidad"] += 1
      }
      this.setState({cart : this.state.cart.concat(items)})
    });
  }


  componentWillUnmount(){
    PubSub.unsubscribe('add', (topic,items) => {
      this.setState({
        cart: this.state.cart.concat(items)
      })
      console.log(items)
    });

  }

  mostrarProductosCarrito(){
    let path = "http://localhost:8080/vendedor/uploads/img/";
    if(this.state.cart){
      return this.state.cart.map((producto) =>{
        return(
          <tr key={producto.id}>
            <td><img src={path + producto.foto} alt={producto.foto} className="img-thumbnail rounded imagen"
            /></td>
            <td>{producto.nombre}</td>
            <td>{producto.precio}</td>
            <td><input type="number" value={producto.cantidad} className="form-control col-sm-4"/></td>
            <td>calcular</td>
            <td><button className="btn btn-danger btn-sm" type="button">x</button></td>
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


  render(){
    return(
      <div className="container-sm">
        {this.state.cart.length == 0 ?
        <div className="alert alert-danger" role="alert">
          El carrito esta vacio
        </div> :
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


      }

      </div>
    )
  }
}

export default Carrito;
