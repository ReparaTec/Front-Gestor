import React, { useState, useEffect } from 'react';
import productoService from '../service/productoService.ts';
import estadoService from '../service/estadoService.ts';
import tipoProductoService from '../service/tipoProductService.ts';
import { Product } from '../datos/product.ts';
import { Estado } from '../datos/Estado.ts';
import { tipoProduct } from '../datos/TipoProduct.ts';

const ProductForm = () => {
  const initialProductState: Product = {
    id: 0,
    nombre: '',
    precio: 0,
    stock: 0,
    codigoDeBarras: '',
    estado: { id: 0, activo: true },
    tipoProducto: { id: 0, nombre: '', estado: { id: 0, activo: true } },
  };

  const [product, setProduct] = useState<Product>(initialProductState);
  const [productos, setProductos] = useState<Product[]>([]);
  const [estados, setEstados] = useState<Estado[]>([]);
  const [tiposProducto, setTiposProducto] = useState<tipoProduct[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (product.id) {
        // Editar producto existente
        await productoService.editarProducto(product.id, product);
      } else {
        // Crear nuevo producto
        await productoService.crearProducto(product);
      }

      // Actualizar la lista de productos después de la operación
      const nuevosProductos = await productoService.obtenerProductos();
      setProductos(nuevosProductos);

      // Limpiar el formulario
      setProduct(initialProductState);
    } catch (error) {
      console.error('Error al guardar producto', error);
    }
  };

  useEffect(() => {
    // Obtener la lista de productos al cargar el componente
    const fetchProductos = async () => {
      try {
        const productosObtenidos = await productoService.obtenerProductos();
        setProductos(productosObtenidos);
      } catch (error) {
        console.error('Error al obtener productos', error);
      }
    };
    // Obtener la lista de estados al cargar el componente
    const fetchEstados = async () => {
      try {
        const estadosObtenidos = await estadoService.obtenerEstados();
        setEstados(estadosObtenidos);
      } catch (error) {
        console.error('Error al obtener estados', error);
      }
    };

    // Obtener la lista de tipos de productos al cargar el componente
    const fetchTiposProducto = async () => {
      try {
        const tiposProductoObtenidos = await tipoProductoService.obtenerTipoProductos();
        setTiposProducto(tiposProductoObtenidos);
      } catch (error) {
        console.error('Error al obtener tipos de productos', error);
      }
    };

    fetchProductos();
    fetchEstados();
    fetchTiposProducto();
  }, []); // Se ejecuta solo en la carga inicial

  //eliminar productos
  const handleDelete = async (id: number) => {
    try {
      // Obtener el producto correspondiente al id
      const productoAEliminar = productos.find((p) => p.id === id);
  
      if (!productoAEliminar) {
        console.error('Producto no encontrado');
        return;
      }
  
      // Cambiar el estado del producto localmente
      const productosActualizados = productos.map((p) =>
        p.id === id ? { ...p, estado: { id:2, activo: false } } : p
      );
      setProductos(productosActualizados);
  
      console.log('Antes de editar en la base de datos:', productoAEliminar);
  
      // Modificar el objeto productoAEliminar y luego llamar al método de edición en el servidor
      productoAEliminar.estado.id = 2;
      productoAEliminar.estado.activo = false;
  
      console.log('Producto modificado:', productoAEliminar);
  
      await productoService.editarProducto(id, productoAEliminar);
  
      console.log("Cambios guardados en la base de datos");
    } catch (error) {
      console.error('Error al eliminar producto', error);
    }
  };
  return (
    <div>
      <h2>Formulario de Productos</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={product.nombre } onChange={handleInputChange} />

        <label>Precio:</label>
        <input type="number" name="precio" value={product.precio } onChange={handleInputChange} />

        <label>Cantidad:</label>
        <input type="number" name="stock" value={product.stock } onChange={handleInputChange} />

        <label>Código de Barras:</label>
        <input type="text" name="codigoDeBarras" value={product.codigoDeBarras } onChange={handleInputChange} />

        <label>Estado:</label>
        <select
            name="estado"
            value={product.estado ? product.estado.id : ''}
            onChange={(e) =>
                setProduct({
                ...product,
                estado: { id: parseInt(e.target.value), activo: true },
                })
            }
            >
            <option value="">Seleccionar Estado</option>
            {estados.map((estado) => (
                <option key={estado.id} value={estado.id}>
                {estado.activo != null ? estado.activo ? 'Activo' : 'Inactivo' : 'Desconocido'}
                </option>
            ))}
        </select>

        <label>Tipo de Producto:</label>
        <select
  name="tipoProducto"
  value={product.tipoProducto ? product.tipoProducto.id : ''}
  onChange={(e) =>
    setProduct({
      ...product,
      tipoProducto: { id: e.target.value !== '' ? parseInt(e.target.value, 10) : 0, nombre: '', estado: { id: 0, activo: true } },
    })
  }
>
  <option value="">Seleccionar tipo</option>
  {tiposProducto.map((tipo) => (
    <option key={tipo.id} value={tipo.id}>
      {tipo.nombre || 'N/A'}
    </option>
  ))}
</select>

        <button type="submit">{product.id ? 'Editar' : 'Crear'} Producto</button>
      </form>

      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} - {p.precio} - {p.codigoDeBarras } - {p.estado ? (p.estado.activo ? 'Activo' : 'Inactivo') : 'Desconocido'}  - {p.tipoProducto ? p.tipoProducto.nombre : 'Tipo Desconocido'}-{p.stock}{' '}
            <button onClick={() => setProduct(p)}>Editar</button>
            <button onClick={() => handleDelete(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductForm;