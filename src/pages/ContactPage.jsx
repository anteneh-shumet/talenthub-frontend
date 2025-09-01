import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', { name, email, subject, message });
      setSuccess('Your message has been sent successfully!');
      setError('');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setError('Failed to send message. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with Background Image */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center py-20 md:py-28 flex justify-center items-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30, 64, 175, 0.7), rgba(30, 64, 175, 0.7)), url('https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-4xl w-full px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Have questions, suggestions, or need help? Reach out to us using the form below.
          </p>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-10 max-w-2xl mx-auto"
          >
            {success && <p className="text-green-600 mb-4">{success}</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 md:p-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 md:p-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
                required
              />
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-3 md:p-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
                required
              />
              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 md:p-4 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition resize-none h-32 md:h-40"
                required
              />
              <button
                type="submit"
                className="w-full bg-secondary text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold shadow-md hover:bg-green-700 transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </motion.section>

      {/* Optional Info Section */}
      <section className="max-w-4xl mx-auto text-center mt-12 space-y-4">
        <h3 className="text-xl md:text-2xl font-semibold text-primary">
          Other Ways to Reach Us
        </h3>
        <p className="text-gray-700">
          Email: support@talenthub.com <br />
          Phone: 251 0987654321 <br />
          Address: 123 TalentHub Street, Addis Ababa, Ethiopia
        </p>
      </section>
    </div>
  );
};

export default ContactPage;
