import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const linkVariants = {
    hover: { scale: 1.05, color: "#22c55e", transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const iconVariants = {
    hover: { scale: 1.2, rotate: 10, transition: { duration: 0.2 } },
    tap: { scale: 0.9 },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
      className="relative mt-20 overflow-hidden text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(6, 78, 134, 0.85), rgba(6, 78, 134, 0.85)), url('https://images.unsplash.com/photo-1516321310762-479437144403?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-6 py-12 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start">
          <Link to="/">
            <motion.h2
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1.5,
              }}
              className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent"
            >
              Talent<span className="text-emerald-400">Hub</span>
            </motion.h2>
          </Link>
          <p className="text-gray-200 text-sm mt-4 leading-relaxed text-center md:text-left">
            Connecting top talent with world-class opportunities. Your career journey starts here.
          </p>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h3 className="font-semibold text-lg mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-gray-200">
            {["Home", "Jobs", "About Us", "Contact"].map((name) => (
              <motion.li key={name} variants={linkVariants} whileHover="hover" whileTap="tap">
                <Link
                  to={`/${name === "Home" ? "" : name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="relative hover:text-emerald-300 transition after:content-[''] after:block after:h-[2px] after:w-0 after:bg-emerald-300 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="col-span-1">
          <h3 className="font-semibold text-lg mb-3 text-white">Resources</h3>
          <ul className="space-y-2 text-gray-200">
            {["FAQ", "Blog", "Support"].map((name) => (
              <motion.li key={name} variants={linkVariants} whileHover="hover" whileTap="tap">
                <Link
                  to={`/${name.toLowerCase()}`}
                  className="relative hover:text-emerald-300 transition after:content-[''] after:block after:h-[2px] after:w-0 after:bg-emerald-300 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Social Icons */}
        <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-end">
          <h3 className="font-semibold text-lg mb-3 text-white text-center md:text-right">Follow Us</h3>
          <div className="flex justify-center md:justify-end space-x-4">
            {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition text-white"
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal line and copyright */}
      <hr className="border-t border-white/30 mx-6" />
      <div className="text-center py-4 text-sm text-gray-200">
        © {new Date().getFullYear()} TalentHub. All Rights Reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
