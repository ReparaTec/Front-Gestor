import axios from 'axios';

class ProductoService {
  async obtenerProductos() {
    try {
      const response = await axios.get('http://localhost:8080/api/controller/productos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos', error);
      throw error;
    }
  }
}

const productoService = new ProductoService();
export default productoService;