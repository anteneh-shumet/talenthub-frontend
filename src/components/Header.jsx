import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const linkVariants = {
    hover: { scale: 1.05, color: "#22c55e", transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const navLinks = [
    { name: "Home", to: "/" },
    // { name: "Jobs", to: "/jobs" },
    { name: "About Us", to: "/about" },
  ];

  const resourceLinks = [
    { name: "FAQ", to: "/faq" },
    { name: "Blog", to: "/blog" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <>
      {/* Desktop Header */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 bg-gradient-to-r from-[#064E86] to-[#0891b2] text-white shadow-lg backdrop-blur-lg"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 2,
              }}
              className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent"
            >
              Talent<span className="text-emerald-400">Hub</span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {/* Main Links */}
            {navLinks.map((link) => (
              <motion.div key={link.name} variants={linkVariants} whileHover="hover" whileTap="tap">
                <Link
                  to={link.to}
                  className="relative text-white/90 hover:text-emerald-300 transition font-medium after:content-[''] after:block after:h-[2px] after:w-0 after:bg-emerald-300 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            {/* Resources */}
            {resourceLinks.map((link) => (
              <motion.div key={link.name} variants={linkVariants} whileHover="hover" whileTap="tap">
                <Link
                  to={link.to}
                  className="relative text-white/80 hover:text-emerald-300 transition font-medium after:content-[''] after:block after:h-[2px] after:w-0 after:bg-emerald-300 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            {/* User Actions */}
            <div className="flex items-center space-x-5 ml-6">
              {user ? (
                <>
                  <span className="text-sm italic opacity-80">Hi, {user.username}</span>
                  {user.role === "employer" && (
                    <Link to="/add-job" className="text-white/90 hover:text-emerald-300 transition">
                      Add Job
                    </Link>
                  )}
                  {user.role === "applicant" && (
                    <Link to="/my-applications" className="text-white/90 hover:text-emerald-300 transition">
                      My Applications
                    </Link>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="bg-emerald-400 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-emerald-500 transition"
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-white/90 hover:text-emerald-300 transition">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-emerald-400 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-emerald-500 transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className="md:hidden focus:outline-none"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-gradient-to-b from-[#064E86] to-[#0891b2] backdrop-blur-lg flex flex-col items-center justify-center space-y-8 text-lg"
          >
            {[...navLinks, ...resourceLinks].map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="text-white/90 hover:text-emerald-300 transition font-medium"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <>
                <span className="text-white italic opacity-80">Hi, {user.username}</span>
                {user.role === "employer" && (
                  <Link to="/add-job" onClick={() => setIsMenuOpen(false)} className="text-white/90 hover:text-emerald-300">
                    Add Job
                  </Link>
                )}
                {user.role === "applicant" && (
                  <Link to="/my-applications" onClick={() => setIsMenuOpen(false)} className="text-white/90 hover:text-emerald-300">
                    My Applications
                  </Link>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="bg-emerald-400 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-emerald-500 transition"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-white/90 hover:text-emerald-300">
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-emerald-400 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-emerald-500 transition"
                >
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-20"></div>
    </>
  );
};

export default Header;
