import React, { useState, useEffect } from 'react';
import { Product } from '../datos/product';
import productoService from '../service/productoService.ts';

const ProductPage = () => {
  const [productos, setProductos] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productos = await productoService.obtenerProductos();
        setProductos(productos);
        console.log(productos);
      } catch (error) {
        console.error('Error al obtener productos', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            {producto.nombre} - {producto.precio} - {producto.codigoDeBarras}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPage;