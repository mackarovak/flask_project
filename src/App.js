import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Products from './components/Products';
import EditProduct from './components/EditProduct'; // Импортируем компонент EditProduct

function App() {
  const isAuthenticated = !!localStorage.getItem('token'); // Проверка аутентификации

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/tovars"
          element={isAuthenticated ? <Products /> : <Navigate to="/login" />}
        />
        <Route path="/products/:id/edit" element={<EditProduct />} /> {/* Маршрут для редактирования */}
      </Routes>
    </Router>
  );
}

export default App;