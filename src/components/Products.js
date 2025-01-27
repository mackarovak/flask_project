import React, { useEffect, useState } from 'react'; // Импорт React, useEffect и useState
import axios from 'axios'; // Импорт axios
import { useNavigate } from 'react-router-dom'; // Импорт useNavigate

// Стили вынесены в отдельный объект
const styles = {
  productsContainer: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#fff0f5', // Розовый фон
  },
  productsList: {
    listStyle: 'none',
    padding: '0',
  },
  productsListItem: {
    background: '#fff',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#ff69b4', // Розовая кнопка
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  deleteButton: {
    backgroundColor: '#ff1493', // Темно-розовая кнопка
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
};

function Products() {
  const [products, setProducts] = useState([]); // Использование useState
  const navigate = useNavigate(); // Использование useNavigate

  useEffect(() => {
    axios.get('/api/products') // Использование axios
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleEdit = (id) => {
    navigate(`/products/${id}/edit`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/products/${id}`); // Использование axios
      if (response.status === 200) {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      }
    } catch (error) {
      console.error(error);
      alert('Failed to delete product.');
    }
  };

  return (
    <div style={styles.productsContainer}> {/* Использование styles */}
      <h1 style={{ color: '#ff69b4' }}>Products</h1>
      <ul style={styles.productsList}> {/* Использование styles */}
        {products.map(product => (
          <li key={product.id} style={styles.productsListItem}> {/* Использование styles */}
            <span>{product.name} - ${product.price}</span>
            <div>
              <button style={styles.editButton} onClick={() => handleEdit(product.id)}>Edit</button> {/* Использование styles */}
              <button style={styles.deleteButton} onClick={() => handleDelete(product.id)}>Delete</button> {/* Использование styles */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;