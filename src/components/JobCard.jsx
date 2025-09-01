import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const JobCard = ({ job, user }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      className="relative bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
    >
      {/* Featured Badge */}
      {job.isFeatured && (
        <span className="absolute top-0 left-0 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-br-lg">
          Featured
        </span>
      )}

      {/* Job Info */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-primary mb-1">{job.title}</h3>
        <p className="text-gray-600 mb-2 line-clamp-3 text-sm">{job.description}</p>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Posted by: {job.createdBy}</span>
          <span>Category: {job.category}</span>
        </div>
      </div>

      {/* Apply Button */}
      {user && user.role === 'applicant' && (
        <Link
          to={`/apply/${job.id}`}
          className="mt-4 self-start bg-secondary text-white px-5 py-2 rounded-full font-semibold hover:bg-green-700 transition"
        >
          Apply Now
        </Link>
      )}
    </motion.div>
  );
};

export default JobCard;
