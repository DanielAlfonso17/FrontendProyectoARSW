import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { ProductoService } from './service/ProductoService'
import Swal from 'sweetalert2'

export class EditProducto extends Component {
  productoVacio = {
    "nombre": '',
    "precio": '',
    "foto": 'noproduct.jpg',
    "descripcion": ''
  }


  constructor(props){
    super(props);
    this.state = {
      producto: this.productoVacio,
      fotoSeleccionada: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.seleccionarFoto = this.seleccionarFoto.bind(this);
    this.productoService = new ProductoService();
  }



  async componentDidMount(){
    if(this.props.match.params.id !== 'new'){
      const item = await(this.productoService.getById(this.props.match.params.id));
      this.setState({producto: item});
    }
  }

  handleChange(event){
    const target = event.target;
    const value = target.value;
    const nombre = target.name;
    let producto = {...this.state.producto}
    producto[nombre] = value;
    this.setState({producto});
  }

  seleccionarFoto(event){
    let fotoSel = event.target.files[0];
    if(fotoSel.type.indexOf('image') < 0){
      console.log("Suba un archivo valido")
      fotoSel = null;
    }
    this.setState({fotoSeleccionada: fotoSel});
  }

  async handleSubmit(event){
    event.preventDefault();
    const {producto} = this.state;
    console.log(producto)
    if(producto.id){
      this.productoService.save(producto);

    }else{
      this.productoService.save(producto);
    }if(this.state.fotoSeleccionada){
      await(this.productoService.subirFoto(this.state.fotoSeleccionada,producto.id));
    }
      this.props.history.push('/productos');


  }

  render() {
   const {producto} = this.state;
   const title = <h2>{producto.id ? 'Editar producto' : 'Agregar producto'}</h2>;
   return (
     <div>
     <div className="container">

       {title}
       <form onSubmit={this.handleSubmit}>
         <FormGroup>
           <Label for="nombre">Nombre</Label>
           <Input type="text" name="nombre" id="nombre" value={producto.nombre || ''}
                  onChange={this.handleChange} autoComplete="name"/>
         </FormGroup>
         <FormGroup>
           <Label for="precio">Precio</Label>
           <Input type="text" name="precio" id="precio" value={producto.precio || ''}
                  onChange={this.handleChange} autoComplete="address-level1"/>
         </FormGroup>
         <FormGroup>
           <Label for="descripcion">Descripcion</Label>
           <Input type="text" name="descripcion" id="descripcion" value={producto.descripcion || ''}
                  onChange={this.handleChange} autoComplete="address-level1"/>
         </FormGroup>
         <FormGroup className={producto.id ? '':'hidden'}>
            <Label for="foto">Foto</Label>
            <Input type="file" name="foto" id="foto" onChange={this.seleccionarFoto}  autoComplete="address-level1"/>
         </FormGroup>
         <FormGroup>
           <Button color="primary" className="mr-2" type="submit">Guardar producto</Button>
           <Button color="secondary" tag={Link} to="/productos">Cancelar</Button>
         </FormGroup>

       </form>
   </div>
   </div>

   )}
}
export default withRouter(EditProducto);
