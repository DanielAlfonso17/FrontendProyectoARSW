import React, { Component } from 'react';
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import AuthService from './service/AuthService';
import Swal from 'sweetalert2'
var stompClient = null;

class ChatBox extends Component {

  constructor(props) {
    super(props);

    this.state =
      {
        username: '',
        enSubasta: false,
        mensaje: '',
        ganador:'',
        precio: '',
        vendedor: false,
        comprador: false

      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.entrarSubasta = this.entrarSubasta.bind(this);
      this.handleEmpezarSubasta = this.handleEmpezarSubasta.bind(this);
      this.handleFinalizarSubasta = this.handleFinalizarSubasta.bind(this);



  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    const {precio} = this.props.match.params;
    console.log(precio)
    this.setState({
      username: user.username,
      vendedor: user.roles.includes("ROLE_VENDEDOR"),
      comprador: user.roles.includes("ROLE_COMPRADOR"),
      precio: precio
    })
    this.entrarSubasta();
  }

  entrarSubasta(){
    const {producto} = this.props.match.params
     var socket = new SockJS('https://offerbuy-arsw.herokuapp.com/ws');
     stompClient = Stomp.over(socket);
     stompClient.connect({}, (frame) => {
         console.log('Connected: ' + frame);
         stompClient.subscribe('/topic/chat.' + producto, (res) => {
           if(res.body.includes("true") || res.body.includes("false")){
             let list= res.body.split(".");
             this.setState({
               enSubasta: list[1]
             })
             if(res.body.includes("false")){
               Swal.fire({
                     title: 'Ganador de subasta!',
                     type: 'success',
                     icon: 'success',
                     confirmButtonColor: '#3085d6',
                     text: `El ganador de la subasta es: ${this.state.ganador}`,
                 })

             }

           }
           else if(res.body === this.state.precio){
             console.log("se mantuvo el precio");
           }else{
             const user = AuthService.getCurrentUser();
             let list= res.body.split("-");
             this.setState({
               precio: list[0],
               ganador: list[1]
             })
           }
         });
     });
  }

  handleSubmit(event){
    event.preventDefault();
    const {producto} = this.props.match.params
    let mensajes = [this.state.mensaje,producto,this.state.precio,this.state.username]
    stompClient.send("/app/chat", {}, JSON.stringify(mensajes));
  }

  handleChange(event){
    event.preventDefault();
    this.setState({
      mensaje: event.target.value
    })

  }

  handleEmpezarSubasta(event){
    event.preventDefault();
    let estado = true
    const {producto} = this.props.match.params
    let nombreSala = [estado,producto]
    stompClient.send("/app/chat", {}, JSON.stringify(nombreSala));
  }

  handleFinalizarSubasta(event){
    event.preventDefault();
    let estado = false
    const {producto} = this.props.match.params
    let nombreSala = [estado,producto,this.state.ganador]
    stompClient.send("/app/chat", {}, JSON.stringify(nombreSala));


  }


  render(){
    return(
      <div className="container">
      {console.log(this.state.enSubasta)}
      <form onSubmit={this.handleSubmit}>
        Precio Actual: {this.state.precio}
        <div className="container my-5 mx-5">
        {this.state.ganador} : {this.state.precio}
        </div>

        {this.state.comprador && this.state.enSubasta ? (
          <div className="container">
            <input type="number" onChange={this.handleChange}/>
            <button className="btn btn-primary"type="submit">Ofertar</button>
          </div>
        ):
        (<div className="alert alert-danger">No se subasta</div>)
        }

        {this.state.vendedor && (
          <div className="container my-5">
            <button className="btn btn-warning mx-2" onClick={this.handleFinalizarSubasta}>Finalizar Subasta</button>
            <button className="btn btn-success" onClick={this.handleEmpezarSubasta}>Empezar Subasta</button>
          </div>)}
      </form>
      </div>
    )
  }
}

export default ChatBox
