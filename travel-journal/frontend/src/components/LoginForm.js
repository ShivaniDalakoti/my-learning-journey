import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './AuthForm.css';

function LoginForm({ onSuccess, onSwitchToSignup }) {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await login(formData.email, formData.password);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Welcome Back</h2>
      <p>Sign in to your Travel Journal</p>

      {error && <div className="auth-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={submitting}
      >
        {submitting ? 'Signing in...' : 'Sign In'}
      </button>

      <p className="auth-switch">
        Don't have an account?{' '}
        <button
          type="button"
          className="switch-link"
          onClick={onSwitchToSignup}
        >
          Sign up
        </button>
      </p>
    </form>
  );
}

export default LoginForm;
