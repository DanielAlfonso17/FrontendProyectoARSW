import React, { Component } from 'react';
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import AuthService from './service/AuthService';

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
        precio: '5000',
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
    this.setState({
      username: user.username,
      vendedor: user.roles.includes("ROLE_VENDEDOR"),
      comprador: user.roles.includes("ROLE_COMPRADOR")
    })
    this.entrarSubasta();
  }

  entrarSubasta(){
    const {productoid} = this.props.match.params
     var socket = new SockJS('http://localhost:8080/ws');
     stompClient = Stomp.over(socket);
     stompClient.connect({}, (frame) => {
         console.log('Connected: ' + frame);
         stompClient.subscribe('/topic/chat.' + productoid, (res) => {
           if(res.body.includes("true") || res.body.includes("false")){
             let list= res.body.split(".");
             console.log(list[0])
             this.setState({
               enSubasta: list[1]
             })
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
    const {productoid} = this.props.match.params
    let mensajes = [this.state.mensaje,productoid,this.state.precio,this.state.username]
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
    const {productoid} = this.props.match.params
    let nombreSala = [estado,productoid]
    stompClient.send("/app/chat", {}, JSON.stringify(nombreSala));
  }

  handleFinalizarSubasta(event){
    event.preventDefault();
    let estado = false
    const {productoid} = this.props.match.params
    let nombreSala = [estado,productoid,this.state.ganador]
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
