import axios from 'axios';
import AuthHeader from './AuthHeader';

const AUTH_URL = 'http://localhost:8080/auth/test'

class UserService{
  getPublicContent(){
    return axios.get(AUTH_URL + 'all');
  }

  getCompradorBoard(){
    return axios.get(AUTH_URL + 'Comprador', { headers: AuthHeader() });
  }

  getVendedorBoard(){
    return axios.get(AUTH_URL + 'Vendedor', { headers: AuthHeader() });
  }
}

export default new UserService();
