import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Producto } from '../datos/product';

const ProductPage = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nuevoProducto, setNuevoProducto] = useState<{ nombre: string; precio: number; codigoDeBarras: string }>({
    nombre: '',
    precio: 0,
    codigoDeBarras: '',
  });

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const response = await axios.get<Producto[]>('/api/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const agregarProducto = async () => {
    try {
      await axios.post('/api/productos', nuevoProducto);
      cargarProductos();
      // Limpia el formulario después de agregar un nuevo producto
      setNuevoProducto({ nombre: '', precio: 0, codigoDeBarras: '' });
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  const eliminarProducto = async (id: number) => {
    try {
      await axios.delete(`/api/productos/${id}`);
      cargarProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  return (
    <div>
      <h1>Gestión de Productos</h1>

      {/* Formulario para agregar nuevos productos */}
      <div>
        <h2>Agregar Nuevo Producto</h2>
        <label>
          Nombre:
          <input
            type="text"
            value={nuevoProducto.nombre}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
          />
        </label>
        <label>
          Precio:
          <input
            type="number"
            value={nuevoProducto.precio}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: Number(e.target.value) })}
          />
        </label>
        <label>
          Código de Barras:
          <input
            type="text"
            value={nuevoProducto.codigoDeBarras}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, codigoDeBarras: e.target.value })}
          />
        </label>
        <button onClick={agregarProducto}>Agregar Producto</button>
      </div>

      {/* Lista de productos existentes */}
      <div>
        <h2>Lista de Productos</h2>
        <ul>
          {productos.map((producto) => (
            <li key={producto.id}>
              {producto.nombre} - {producto.precio} - {producto.codigoDeBarras}
              <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductPage;