import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="bg-white space-y-16 md:space-y-20">

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center py-20 md:py-24 bg-cover bg-center rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(30,64,175,0.85), rgba(30,64,175,0.85)), url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')`,
        }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 md:mb-6 leading-snug md:leading-tight">
            About TalentHub
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-100 max-w-2xl mx-auto">
            TalentHub is your go-to platform for discovering career opportunities and connecting with top talent worldwide.
            Our mission is to bridge the gap between skilled professionals and companies looking to hire.
          </p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 md:px-6 py-16 md:py-20 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl md:rounded-3xl shadow-inner"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-6">
          Our Mission
        </h2>
        <p className="text-gray-700 text-base md:text-lg text-center max-w-3xl mx-auto">
          We aim to create a seamless platform where employers can find exceptional talent, and professionals can explore
          exciting job opportunities, all in one trusted hub. Empowering careers, one connection at a time.
        </p>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 md:px-6 py-16 md:py-20 rounded-2xl md:rounded-3xl shadow-2xl bg-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: 'Alice Johnson', role: 'CEO', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
            { name: 'Michael Lee', role: 'CTO', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
            { name: 'Sophia Brown', role: 'Lead Designer', image: 'https://randomuser.me/api/portraits/women/65.jpg' },
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 flex flex-col items-center shadow-md hover:shadow-xl transition"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-white shadow-lg"
              />
              <h3 className="text-xl font-semibold text-primary mb-1">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center py-16 md:py-20 bg-primary/95 rounded-2xl md:rounded-3xl shadow-2xl text-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to take your career to the next level?
        </h2>
        <motion.a
          href="/register"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-secondary text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-xl transition"
        >
          Join TalentHub Now
        </motion.a>
      </motion.section>
    </div>
  );
};

export default AboutPage;
