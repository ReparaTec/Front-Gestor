import axios from 'axios';
import { Product } from '../datos/product';

class ProductoService {
  async obtenerProductos() : Promise<Product[]>{
    try {
      const response = await axios.get('http://localhost:8080/api/controller/activos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos', error);
      throw error;
    }
  }
  async crearProducto(productoData){
    try{
      const response = await axios.post('http://localhost:8080/api/controller/crearproducto', productoData);
    }catch(error){
      console.log('error al registar productox', error);
      throw error;
    }
  }
  
  async eliminarProducto(id: number): Promise<void> {
    try {
      await axios.delete(`http://localhost:8080/api/controller/delete/${id}`);
    } catch (error) {
      console.error('Error al eliminar producto', error);
      throw error;
    }
  }

  async editarProducto(id: number, productoData: Product): Promise<Product> {
    try {
      const response = await axios.put(`http://localhost:8080/api/controller/${id}`, productoData);
      return response.data;
    } catch (error) {
      console.error('Error al editar producto', error);
      throw error;
    }
  }
}


const productoService = new ProductoService();
export default productoService;