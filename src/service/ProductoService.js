import axios from 'axios';
import AuthService from './AuthService';

export class ProductoService{

  urlEndPoint = "http://localhost:8080/";

  getAll(){
    return axios.get(this.urlEndPoint+"comprador/productos").then(res => res.data);
  }

  getByNombre(nombre){
    return axios.get(this.urlEndPoint+"comprador/productos/listar/"+nombre).then(res => res.data);
  }

  save(producto){
    if (producto.id){
      return axios.put(`${this.urlEndPoint}vendedor/productos/${producto.id}`,producto).then(response => console.log(response.data));
    }else{
      let vendedor;
      const user = AuthService.getCurrentUser();
      const correo = user.email;
      axios.get(`${this.urlEndPoint}vendedor/correo/${correo}`
      ).then(res => {
        vendedor= res.data.id
        axios.post(`${this.urlEndPoint}vendedor/productos/${vendedor}`,producto)
      })

    }

  }

  getById(id){
    return axios.get(`${this.urlEndPoint}vendedor/productos/${id}`).then(res => res.data);
  }

  delete(id){
    axios.delete(`${this.urlEndPoint}vendedor/productos/${id}`,
      {headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }});
  }

  subirFoto(archivo,id){
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    return axios.post(`${this.urlEndPoint}vendedor/productos/upload`,formData).then(res => console.log(res.data));
    }

  getProductosVendedorEmail(){
    let vendedor;
    const user = AuthService.getCurrentUser();
    const correo = user.email;
    axios.get(`${this.urlEndPoint}vendedor/correo/${correo}`
    ).then(res => {
      vendedor= res.data.id
      axios.get(`${this.urlEndPoint}vendedor/productos/vendedor/${vendedor}`).then((res) => {console.log(res.data)})
    })


  }
}
