import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://talenthub-backend-bhrj.onrender.com/auth/login', { email, password });
      const token = res.data.token;

      // Save token in localStorage
      localStorage.setItem('token', token);

      // Decode token
      const decoded = jwtDecode(token);

      // Build user object for session
      const userData = {
        id: decoded.id,
        email: res.data.user.email,
        username: res.data.user.name,
        role: decoded.role,
        token,
      };

      // Save to state and localStorage
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      // Show success toast
      toast.success('Login successful! Welcome back!', {
        icon: '🎉',
      });
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || 'Invalid credentials';
      setError(errorMessage);
      // Show error toast
      toast.error(errorMessage, {
        icon: '❌',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Toaster component with custom styling */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            maxWidth: '400px',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            fontSize: '16px',
            fontWeight: '500',
          },
          success: {
            style: {
              background: '#10B981',
              color: '#ffffff',
              border: '1px solid #059669',
            },
            iconTheme: {
              primary: '#ffffff',
              secondary: '#10B981',
            },
          },
          error: {
            style: {
              background: '#EF4444',
              color: '#ffffff',
              border: '1px solid #B91C1C',
            },
            iconTheme: {
              primary: '#ffffff',
              secondary: '#EF4444',
            },
          },
        }}
      />

      {/* Right Side - Image */}
      <div
        className="w-full md:w-1/2 bg-cover bg-center order-first md:order-last h-64 md:h-auto"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        <div className="h-full w-full bg-gradient-to-l from-primary/80 via-primary/60 to-transparent flex items-center justify-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold p-8 text-center">
            Discover & Connect with Top Talent
          </h2>
        </div>
      </div>

      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-md w-full space-y-6">
          <h1 className="text-4xl font-bold text-primary mb-2">Welcome Back!</h1>
          <p className="text-gray-500 mb-6">Login to access your account</p>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none transition"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none transition"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-secondary text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="/register" className="text-secondary font-semibold hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;