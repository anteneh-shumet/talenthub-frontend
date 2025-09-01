import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import JobCard from '../components/JobCard';

const LandingPage = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('https://talenthub-backend-bhrj.onrender.com/jobs', {
          headers: user?.token ? { Authorization: `Bearer ${user.token}` } : {},
        });
        const jobsWithImages = res.data.map((job, index) => ({
          ...job,
          category: index % 2 === 0 ? 'Software' : 'Design',
          isFeatured: index === 0,
          image:
            index % 2 === 0
              ? 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
              : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        }));
        setJobs(jobsWithImages);
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || 'Failed to load jobs.', { icon: '❌' });
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [user]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(
      (job) =>
        (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (category === 'all' || job.category === category)
    );
  }, [searchTerm, category, jobs]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="h-12 w-12 border-t-4 border-b-4 border-green-500 rounded-full"
          aria-label="Loading job listings"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Toaster />

      {/* Hero Section with Image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-blue-600 to-green-500 rounded-3xl shadow-2xl mx-4 md:mx-8 mt-8 overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
          alt="Hero"
          className="w-full h-64 md:h-96 object-cover opacity-40"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            TalentHub: Launch Your Career 🚀
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-100 mb-6 max-w-3xl">
            Discover top opportunities or hire world-class talent with ease.
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <a
                href="/register"
                className="inline-block bg-secondary text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-green-700 transition duration-300"
              >
                Get Started
              </a>
              <a
                href="/login"
                className="inline-block bg-white text-secondary px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
              >
                Sign In
              </a>
            </div>
          )}
        </div>
      </motion.section>

      {/* Search + Filter */}
      <section className="bg-white py-10 md:py-12 shadow-lg mx-4 md:mx-8 mt-8 rounded-3xl">
        <div className="container mx-auto px-4 md:px-8 flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 border border-gray-200 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-white text-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="relative w-full sm:max-w-xs">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-white text-gray-700 appearance-none pr-10"
            >
              <option value="all">All Categories</option>
              <option value="Software">Software</option>
              <option value="Design">Design</option>
            </select>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="container mx-auto px-4 md:px-8 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-blue-800 text-center">
          Discover Your Next Opportunity
        </h2>
        <AnimatePresence>
          {filteredJobs.length === 0 ? (
            <p className="text-center text-gray-600 text-lg md:text-xl" role="alert">
              No jobs match your search. Try adjusting your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredJobs.map((job, index) => (
                <JobCard key={job.id} job={job} user={user} />
              ))}
            </div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

LandingPage.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.oneOf(['applicant', 'employer']),
  }),
};

export default LandingPage;
