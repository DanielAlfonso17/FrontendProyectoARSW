import axios from 'axios';

const AUTH_URL = "http://localhost:8080/auth/";

class AuthService {
  login(username, password){
    return axios.post(AUTH_URL + "signin",{
      username,
      password
    }).then((response) => {
      if(response.data.accessToken){
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
  }

  logout(){
    localStorage.removeItem("user");
  }

  register(username,password,email,nombre,apellido,rol){
    return axios.post(AUTH_URL + "signup", {
      username,
      email,
      rol,
      password,
      nombre,
      apellido
    });
  }

  getCurrentUser(){
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
