import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const styles = {
  authContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff0f5', // Розовый фон
  },
  authForm: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  authFormH2: {
    marginBottom: '1.5rem',
    color: '#ff69b4', // Розовый заголовок
  },
  authFormLabel: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#555',
    textAlign: 'left',
  },
  authFormInput: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  authFormButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#ff69b4', // Розовая кнопка
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  authFormButtonHover: {
    backgroundColor: '#ff1493', // Темно-розовый при наведении
  },
  errorMessage: {
    color: '#ff4d4f',
    marginBottom: '1rem',
  },
};

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users', {
        username,
        password,
      });

      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div style={styles.authContainer}>
      <div style={styles.authForm}>
        <h2 style={styles.authFormH2}>Register</h2>
        {error && <p style={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label style={styles.authFormLabel}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.authFormInput}
              required
            />
          </div>
          <div>
            <label style={styles.authFormLabel}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.authFormInput}
              required
            />
          </div>
          <button type="submit" style={styles.authFormButton}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;