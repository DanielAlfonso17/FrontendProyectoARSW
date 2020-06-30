import axios from 'axios';

export class FacturaService{
  urlEndPoint = "http://localhost:8080/offerbuy";

  getFactura(id){
    return axios.get(`${this.urlEndPoint}/${id}`).then(res => console.log(res.data));
  }
}
