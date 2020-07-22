import axios from 'axios';

export class FacturaService{
  urlEndPoint = "https://offerbuy-arsw.herokuapp.com/offerbuy";

  getFactura(id){
    return axios.get(`${this.urlEndPoint}/${id}`).then(res => console.log(res.data));
  }
}
