import axios from 'axios';

class TipoProductoService {
  async obtenerTipoProductos() {
    try {
      const response = await axios.get('http://localhost:8080/api/tipo-producto/tipos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener tipos', error);
      throw error;
    }
  }
}

const tipoProductoService = new TipoProductoService();
export default tipoProductoService;