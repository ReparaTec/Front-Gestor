import React, { useState, useEffect } from 'react';
import tipoProductService from '../service/tipoProductService.ts';
import { Link } from 'react-router-dom';
import { tipoProduct } from '../datos/TipoProduct.ts';

const TipoProductPage = () => {
  const [tipoProductos, setTipoProductos] = useState<tipoProduct[]>([]);

  useEffect(() => {
    const fetchTipoProductos = async () => {
      try {
      const tipos = await tipoProductService.obtenerTipoProductos();
      setTipoProductos(tipos);
      console.log(tipos);
    } catch (error) {
      console.error('Error al obtener tipos de productos', error);
    }
    };

    fetchTipoProductos();
  }, []);

  return (
    <div>
      <h1>Lista de Tipos de Productos</h1>
      <ul>
        {tipoProductos.map(tipo => (
          <li key={tipo.id}>
            {tipo.nombre} - Estado: {tipo.estado.activo ? 'Activo' : 'Inactivo'}{' '}
            <Link to={`/tipos/${tipo.id}`}>Ver Detalles</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TipoProductPage;