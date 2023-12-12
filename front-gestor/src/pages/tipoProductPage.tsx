import React, { useState, useEffect } from 'react';
import tipoProductService from '../service/tipoProductService.ts';
import { Link } from 'react-router-dom';
import { tipoProduct } from '../datos/TipoProduct.ts';
import ProductForm from '../forms/ProductForm.tsx';

const TipoProductPage = () => {
  return(
    <div>
      <h1>PAGINA DE PRODUCTOS</h1>
      <ProductForm/>
    </div>
  )
};

export default TipoProductPage;