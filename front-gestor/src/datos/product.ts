import { Estado } from "./Estado";
import { tipoProduct } from "./TipoProduct";
export interface Product {
    id: number;
    nombre: string;
    precio?: number;
    stock: number,
    codigoDeBarras: string;
    estado: Estado;
    tipoProducto: tipoProduct;
  }