import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/blog'); // Replace with your API
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
      </div>
    );

  return (
   <div className="bg-white space-y-16 md:space-y-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12 md:py-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl md:rounded-3xl shadow-2xl text-white"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 md:mb-6">
          TalentHub Blog
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Explore career advice, industry news, and tips to accelerate your professional journey.
        </p>
      </motion.section>

      {/* Blog Posts */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <AnimatePresence>
          {posts.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500 text-base md:text-lg col-span-full"
            >
              No blog posts available at the moment. Check back later.
            </motion.p>
          ) : (
            posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl shadow-md overflow-hidden hover:scale-[1.02] transition-transform"
              >
                <img
                  src={post.image || 'https://via.placeholder.com/400x200'}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">{post.title}</h2>
                  <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
                  <a
                    href={`/blog/${post.id}`}
                    className="inline-block text-secondary font-semibold hover:underline"
                  >
                    Read More →
                  </a>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12 md:py-16 bg-primary/95 rounded-2xl md:rounded-3xl shadow-2xl text-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Want to contribute to our blog?
        </h2>
        <a
          href="/contact"
          className="inline-block bg-secondary text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-xl transition"
        >
          Contact Us
        </a>
      </motion.section>
    </div>
  );
};

export default BlogPage;
