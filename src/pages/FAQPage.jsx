import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: 'How do I create an account?',
    answer: 'Click on the "Register" button on the top right and fill out the registration form with your details.',
  },
  {
    question: 'How can I apply for a job?',
    answer: 'After logging in as an applicant, browse jobs on the home page and click "Apply" on the job you are interested in.',
  },
  {
    question: 'Can I post jobs as an employer?',
    answer: 'Yes! If you register as an employer, you will see an "Add Job" button in the header after login.',
  },
  {
    question: 'How do I reset my password?',
    answer: 'Currently, you can reset your password by contacting support at support@talenthub.com.',
  },
  {
    question: 'Is my data safe?',
    answer: 'Absolutely! We follow strict security practices and store your data securely.',
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
          Frequently Asked Questions
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Have questions? We've got answers! Browse the most common questions about TalentHub.
        </p>
      </motion.section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto space-y-4">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl shadow-md"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
            >
              <span className="text-lg md:text-xl font-semibold text-primary">
                {item.question}
              </span>
              <span className="text-2xl text-secondary">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4 text-gray-700 text-base md:text-lg"
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12 md:py-16 bg-primary/95 rounded-2xl md:rounded-3xl shadow-2xl text-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Still have questions?
        </h2>
        <a
          href="/contact"
          className="inline-block bg-secondary text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-xl transition"
        >
          Contact Support
        </a>
      </motion.section>
    </div>
  );
};

export default FAQPage;
