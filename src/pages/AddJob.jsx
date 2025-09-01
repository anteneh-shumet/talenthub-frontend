import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AddJob = ({ user }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!user || user.role !== 'employer') {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      await axios.post('https://talenthub-backend-bhrj.onrender.com/jobs', { title, description }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      // Show success toast
      toast.success('Job added successfully!', {
        icon: '🎉',
      });
      navigate('/');
    } catch (err) {
      console.error('Add job error:', err);
      const errorMessage = err.response?.data?.message || 'Failed to add job';
      setError(errorMessage);
      // Show error toast
      toast.error(errorMessage, {
        icon: '❌',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto">
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
      <h1 className="text-3xl font-bold mb-6 text-primary">Add New Job</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded h-32"
          required
        />
        <button type="submit" className="w-full bg-secondary text-white py-2 rounded hover:bg-green-700">
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;