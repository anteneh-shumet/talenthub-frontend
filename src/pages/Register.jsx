import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('applicant');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(
        'https://talenthub-backend-bhrj.onrender.com/auth/register',
        { name, email, password, role }
      );

      if (!res.data || !res.data.userId) {
        throw new Error(
          'No userId received from server. Response: ' +
            JSON.stringify(res.data)
        );
      }

      // Show success toast only
      toast.success('Registration successful! You can now log in.', {
        icon: '🎉',
        duration: 4000,
      });

      // Clear form fields
      setName('');
      setEmail('');
      setPassword('');
      setRole('applicant');

    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage =
        err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage, { icon: '❌' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Toaster */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: { maxWidth: '400px', padding: '16px', borderRadius: '8px', fontSize: '16px', fontWeight: '500' },
          success: { style: { background: '#10B981', color: '#fff', border: '1px solid #059669' } },
          error: { style: { background: '#EF4444', color: '#fff', border: '1px solid #B91C1C' } },
        }}
      />

      {/* Right Side - Image */}
      <div
        className="w-full md:w-1/2 bg-cover bg-center order-first md:order-last h-64 md:h-auto"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        <div className="h-full w-full bg-gradient-to-l from-primary/80 via-primary/60 to-transparent flex items-center justify-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold p-8 text-center">
            Build Your Career or Find Talent
          </h2>
        </div>
      </div>

      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-md w-full space-y-6">
          <h1 className="text-4xl font-bold text-primary mb-2">Create Account</h1>
          <p className="text-gray-500 mb-6">Join TalentHub and get started</p>
          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none transition"
              required
              disabled={loading}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none transition"
              required
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none transition"
              required
              disabled={loading}
            />

            {/* Role Dropdown */}
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none transition bg-white text-gray-700 appearance-none pr-10"
                disabled={loading}
              >
                <option value="applicant">Applicant</option>
                <option value="employer">Employer</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 bg-secondary text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="text-secondary font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
