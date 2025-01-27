import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const styles = {
  editProductContainer: {
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#fff0f5', // Розовый фон
  },
  editProductForm: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  editProductFormH2: {
    marginBottom: '1.5rem',
    color: '#ff69b4', // Розовый заголовок
  },
  editProductFormLabel: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#555',
  },
  editProductFormInput: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  editProductFormTextarea: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    resize: 'vertical',
    minHeight: '100px',
  },
  editProductFormButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#ff69b4', // Розовая кнопка
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  errorMessage: {
    color: '#ff4d4f',
    marginBottom: '1rem',
  },
};

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', price: '', description: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => {
        console.error(error);
        setError('Failed to load product.');
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/products/${id}`, product);
      if (response.status === 200) {
        navigate('/tovars');
      }
    } catch (error) {
      setError('Failed to update product. Please try again.');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div style={styles.editProductContainer}>
      <div style={styles.editProductForm}>
        <h2 style={styles.editProductFormH2}>Edit Product</h2>
        {error && <p style={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label style={styles.editProductFormLabel}>Name:</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              style={styles.editProductFormInput}
              required
            />
          </div>
          <div>
            <label style={styles.editProductFormLabel}>Price:</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              style={styles.editProductFormInput}
              required
            />
          </div>
          <div>
            <label style={styles.editProductFormLabel}>Description:</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              style={styles.editProductFormTextarea}
            />
          </div>
          <button type="submit" style={styles.editProductFormButton}>Update Product</button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;