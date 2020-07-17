import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { ListProducto } from './ListProducto';
import { Home } from './Home';
import { EditProducto } from './EditProducto'
import { Login } from './Login'
import { SignUp } from './signUp';
import { Profile } from './Profile';
import AuthService from './service/AuthService';


export class App extends Component{
  constructor(props){
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showCompradorBoard: false,
      showVendedorBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount(){
    const user = AuthService.getCurrentUser();
    if(user){
      this.setState({
      currentUser: AuthService.getCurrentUser(),
      showCompradorBoard: user.roles.includes("ROLE_COMPRADOR"),
      showVendedorBoard: user.roles.includes("ROLE_VENDEDOR")
      })
    }
  }

  logOut(){
    AuthService.logout();
  }
  render(){
    const { currentUser, showVendedorBoard, showCompradorBoard } = this.state;
    return(
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="#"><Link to={"/"}><img src="img/logo.png" style={{width: "50px"}} /></Link></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>



          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link className="nav-link" to={"/productos"}> Productos </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
            </ul>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link" onClick={this.logOut}>
                    Salir
                  </Link>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Inicia sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/signup"} className="nav-link">
                    Registrate
                  </Link>
                </li>
              </div>


            )}
          </div>
        </nav>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/productos' exact={true} component={ListProducto}/>
          <Route path='/productos/:id' component={EditProducto}/>
          <Route path='/login' exact={true} component= { Login } />
          <Route path='/signup' exact={true} component = { SignUp }/>
          <Route path="/profile" exact={true} component = { Profile }/>

        </Switch>

      </Router>
    )
  }

}

export default App;
