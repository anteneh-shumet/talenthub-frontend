import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyApplications = ({ user }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // redirect effect
  useEffect(() => {
    if (!user) {
      navigate('/login'); // 🔹 maybe better to send them to login instead of home
    } else if (user.role !== 'applicant') {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user || user.role !== 'applicant') return; // block fetching if not allowed

    const fetchApplications = async () => {
      try {
        const res = await axios.get(`https://talenthub-backend-bhrj.onrender.com/applications/${user.id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setApplications(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  if (!user || user.role !== 'applicant') {
    return <p>Redirecting...</p>; // 🔹 small placeholder while redirect happens
  }

  if (loading) return <p>Loading applications...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-primary">My Applications</h1>
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li
              key={app.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-md"
            >
              <h3 className="text-xl font-bold text-primary">{app.jobTitle}</h3>
              <p className="text-gray-600">{app.jobDescription}</p>
              <p className="text-sm text-gray-500">Status: {app.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyApplications;
