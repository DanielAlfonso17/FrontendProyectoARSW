import axios from 'axios';
import authHeader from './AuthHeader';

const AUTH_URL = 'https://offerbuy-arsw.herokuapp.com/auth/test'

class UserService{
  getPublicContent(){
    return axios.get(AUTH_URL + '/all');
  }

  getCompradorBoard(){
    return axios.get(AUTH_URL + '/comprador', { headers: authHeader() });

  }

  getVendedorBoard(){
    return axios.get(AUTH_URL + '/vendedor', { headers: authHeader() });
  }
}

export default new UserService();
