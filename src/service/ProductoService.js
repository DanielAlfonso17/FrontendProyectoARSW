import axios from 'axios';

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
      return axios.post(`${this.urlEndPoint}vendedor/productos/1`,producto).then( response => console.log(response.data));
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
}
