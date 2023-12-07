import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductPage from './pages/productPage.tsx';
import TipoProductPage from './pages/tipoProductPage.tsx';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/tipos">Tipos de Producto</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/tipos" element={<TipoProductPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;