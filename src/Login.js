import React, { Component } from 'react';
import Form from "react-validation/build/form";
import CheckButton from 'react-validation/build/button';
import Input from 'react-validation/build/input';
import Swal from 'sweetalert2'
import AuthService from './service/AuthService';

const required = value => {
  if(!value){
    return(
      <div className="alert alert-danger" role="alert">
        Este campo es necesario
      </div>
    )
  }
}

export class Login extends Component{
  constructor(props){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message:""
    }
  }

  onChangeUsername(event){
    this.setState({
      username: event.target.value
    })
  }

  onChangePassword(event){
    this.setState({
      password: event.target.value
    })
  }

  handleLogin(event){
    event.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/profile");
          window.location.reload();
          Swal.fire({
              title: 'Inicio de sesión exitoso!',
              type: 'success',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              text: `Sesión iniciada con exito ${this.state.username}`,
          })
        },
        error =>{
          const resMessage = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            this.setState({
              loading: false,
              message: resMessage
            })

            Swal.fire({
                title: 'Inicio de sesión erroneo!',
                type: 'error',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                text: `Error al iniciar sesión: ${this.state.username} usuario o contraseña incorrecta`,
            })
        })
  }

  render(){
    return(
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-1">OfferBuy</h3>
                    <h3 className="login-heading mb-4">Mejor web de compras en linea</h3>
                    <Form onSubmit={this.handleLogin}
                      ref={ c => {
                        this.form = c;
                      }}
                    >
                      <div className="form-label-group">
                        <Input type="text"
                        id="inputUser"
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        validations={[required]} />
                        <label htmlFor="inputUser">Username</label>
                      </div>

                      <div className="form-label-group">
                        <Input type="password"
                        id="inputPassword"
                        className="form-control"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required]}/>
                        <label htmlFor="inputPassword">Password</label>
                      </div>
                      <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Sign in</button>
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
export default Login;
