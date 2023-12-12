import axios from 'axios';

class EstadoService {
  async obtenerEstados() {
    try {
      const response = await axios.get('http://localhost:8080/api/estados');
      return response.data;
    } catch (error) {
      console.error('Error al obtener estados', error);
      throw error;
    }
  }

  async obtenerEstadoPorId(id) {
    try {
      const response = await axios.get(`http://localhost:8080/api/estados/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener estado con ID ${id}`, error);
      throw error;
    }
  }
}

export default new EstadoService();