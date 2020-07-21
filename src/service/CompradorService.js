import axios from 'axios';

export default class CompradorService{
  urlEndPoint = "http://localhost:8080/";

  getVendedorNombre(nombre){
    return axios.get(`${this.urlEndPoint}vendedor/${nombre}`).then((value) => value.data);
  }

  getVendedores(){
    return axios.get(`${this.urlEndPoint}vendedor/vendedor`).then((value) =>value.data);
  }
}
