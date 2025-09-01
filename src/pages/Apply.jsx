import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Apply = ({ user }) => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect logic for non-applicants
  useEffect(() => {
    if (!user || user.role !== 'applicant') {
      navigate('/');
    }
  }, [user, navigate]);

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`https://talenthub-backend-bhrj.onrender.com/jobs/${jobId}`);
        setJob(res.data);
      } catch (err) {
        setError('Job not found');
        toast.error('Job not found', { icon: '❌' });
      }
    };
    fetchJob();
  }, [jobId]);

  const handleApply = async () => {
    try {
      await axios.post(
        'https://talenthub-backend-bhrj.onrender.com/applications',
        { jobId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      // Show success toast
      toast.success('Application submitted successfully!', {
        icon: '🎉',
      });
      setTimeout(() => navigate('/my-applications'), 2000);
    } catch (err) {
      console.error('Application error:', err);
      const errorMessage = err.response?.data?.message || 'Failed to apply. Maybe already applied?';
      toast.error(errorMessage, {
        icon: '❌',
      });
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!job) return <p>Loading...</p>;

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
      <h1 className="text-3xl font-bold mb-6 text-primary">
        Apply for {job.title}
      </h1>
      <p className="mb-4">{job.description}</p>
      <button
        onClick={handleApply}
        className="w-full bg-secondary text-white py-2 rounded hover:bg-green-700"
      >
        Submit Application
      </button>
    </div>
  );
};

export default Apply;