import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from 'react-validation/build/button';
import {isEmail} from 'validator';
import Input from 'react-validation/build/input'
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2'
import  AuthService from './service/AuthService';

const required = value => {
  if(!value){
    return(
      <div className="alert alert-danger" role="alert">
        El campo es requerido
      </div>
    );
  }
}

const emailv = value => {
  if(!isEmail(value)){
    return (
      <div className="alert alert-danger" role="alert">
        No es un email valido
      </div>
    )
  }
}

const usernamev = value => {
  if(value.length < 4 || value.length > 25){
    return(
      <div className="alert alerta-danger" role="alert">
        Usuario invalido no cumple con la longitud
      </div>
    );
  }
}

const passwordv = value => {
  if(value.length < 6 || value.length > 30){
    return (
      <div className="alert alert-danger" role="alert">
        Contraseña invalida no cumple con longitud
      </div>
    )
  }
}

export class SignUp extends Component{
  constructor(props){
    super(props);
    this.handleRegistrar = this.handleRegistrar.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRoles = this.onChangeRoles.bind(this);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeApellido = this.onChangeApellido.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      rol: "",
      nombre: "",
      apellido:"",
      succesful: false,
      message: ""
    };
  }

  onChangeUsername(event){
    this.setState({
      username: event.target.value
    });
  }

  onChangeEmail(event){
    this.setState({
      email: event.target.value
    });
  }

  onChangeNombre(event){
    this.setState({
      nombre: event.target.value
    });
  }

  onChangeApellido(event){
    this.setState({
      apellido: event.target.value
    })
  }

  onChangePassword(event){
    this.setState({
      password: event.target.value
    })
  }

  onChangeRoles(event){
    this.setState({
      rol: event.target.value
    })
  }

  handleRegistrar(event){
    event.preventDefault();
    this.setState({
      message:"",
      succesful: false
    });
    this.form.validateAll();
      AuthService.register(
        this.state.username,
        this.state.password,
        this.state.email,
        this.state.nombre,
        this.state.apellido,
        this.state.rol
      ).then(response => {


        this.setState({
          message: response.data.message,
          succesful: true
        })
        Swal.fire({
            title: 'Registro exitoso!',
            type: 'success',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            text: `Usuario registrado con ${this.state.username} exito `,
        }).then(() => {
          this.props.history.push("/login");
          window.location.reload();
        })
      },
      error =>{
        this.setState({
          succesful: false,
          message: error.toString()
        });

        Swal.fire({
            title: 'Error al registrar usuario!',
            type: 'error',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            text: `Error al registrar usuario ${this.state.message}`,
        })
      })

  }

  render(){

    return (
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-1">OfferBuy</h3>
                    <h3 className="login-heading mb-4">Registrate</h3>
                    <Form onSubmit={this.handleRegistrar}
                    ref={c => {
                      this.form = c;
                    }}>
                      <div className="form-label-group">
                        <label htmlFor="inputUser">Username</label>
                        <Input
                        type="text"
                        id="inputUser"
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        validations= {[required,usernamev]}
                        />
                      </div>

                      <div className="form-label-group">
                        <Input
                        type="text"
                        id="inputNombre"
                        className="form-control"
                        onChange={this.onChangeNombre}
                        validations= {[required,usernamev]}
                        />
                        <label htmlFor="inputNombre">Nombre</label>
                      </div>

                      <div className="form-label-group">
                        <Input
                        type="text"
                        id="inputApellido"
                        className="form-control"
                        onChange={this.onChangeApellido}
                        validations= {[required,usernamev]}
                        />
                        <label htmlFor="inputApellido">Apellido</label>
                      </div>

                      <div className="form-label-group">
                        <Input
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        onChange={this.onChangePassword}
                        validations ={[required, passwordv]}/>
                        <label htmlFor="inputPassword">Password</label>
                      </div>

                      <div className="form-label-group">
                        <Input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        onChange={this.onChangeEmail}
                        validations={[required,emailv]}/>
                        <label htmlFor="inputEmail">Email</label>
                      </div>



                      <div className="form-label-group">
                        <select className="lg" name="rol" id="roles"  onChange={this.onChangeRoles}>
                          <option selected="true" disabled="disabled">-----Seleccione Rol------</option>
                          <option value="ROLE_COMPRADOR">Comprador</option>
                          <option value="ROLE_VENDEDOR">Vendedor</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2">Registrar</button>

                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default SignUp;
