import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaHighlighter, FaTextHeight } from "react-icons/fa";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import samvidhanPathLogo from "../../assets/Nyadeep_logo.png";
import GoogleTranslate from "../Language";
import TextToSpeech from "../TexttoSpeach";
import ThemeChange from "../Themechange";


const NavbarMenu = [
  { id: 1, title: "Home", path: "/hero" },
  {
    id: 2,
    title: "Constitution of India",
    path: "/constitution",
    submenu: [
      { id: 1, title: "History", path: "/constitution/history" },
      { id: 2, title: "Constitution PDFs", path: "/constitution/preamble" },
    ],
  },
  {
    id: 3,
    title: "Explore",
    path: "/explore",
    submenu: [{ id: 1, title: "Case Studies", path: "/casestudies" }],
  },
  {
    id: 4,
    title: "For Citizen",
    path: "/citizen",
    submenu: [
      { id: 1, title: "Fundamental Rights", path: "/citizen/rights" },
      { id: 2, title: "Fundamental Duties", path: "/citizen/duties" },
      { id: 3, title: "Directive Principles", path: "/citizen/dpsp" },
      { id: 4, title: "Amendment", path: "/citizen/amendment" },
      { id: 5, title: "Schedules", path: "/citizen/schedules" },
    ],
  },
  {
    id: 5,
    title: "Engage",
    path: "/engage",
    submenu: [
      { id: 1, title: "Discussion Forum", path: "/engage/discussionforum" },
      { id: 2, title: "Blog", path: "/engage/blog" },
      { id: 3, title: "Podcast", path: "/engage/podcast" },
      { id: 4, title: "Video", path: "/engage/video" },
    ],
  },
  { id: 6, title: "E-Books", path: "/ebooks" },
  { id: 7, title: "Games", path: "/games" },
  { id: 8, title: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTextResizer, setShowTextResizer] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleMenuClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const toggleSubmenu = (menuId) =>
    setActiveMenu(activeMenu === menuId ? null : menuId);

  const Signupclick = () => navigate("/profile");

  return (
    <>
      {/* Accessibility Bar */}
      <div className="text-black shadow-lg bg-yellow-50 dark:bg-gray-800 dark:text-white">
        <div className="container flex items-center justify-between px-2 text-black bg-white lg:px-5 dark:bg-gray-800 dark:text-white">
          <div className="flex items-center space-x-4 text-gray-700 bg-white dark:bg-gray-800 dark:text-white">
            <FaHighlighter
              size={24}
              className="cursor-pointer p-1 rounded hover:bg-yellow-200 dark:hover:bg-yellow-500 transition"
              title="Highlight Text"
            />
            <FaTextHeight
              size={24}
              className="cursor-pointer p-1 rounded hover:bg-yellow-200 dark:hover:bg-yellow-500 transition"
              title="Text Resize"
              onClick={() => setShowTextResizer(true)}
            />
            <TextToSpeech />
            <ThemeChange />
          </div>
          <GoogleTranslate />
        </div>
      </div>

      {/* Text Resizer Popup */}
      {showTextResizer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm p-5 bg-white rounded-lg shadow-lg">
            <div className="text-xl font-semibold">Text Resizer</div>
            <div className="flex mt-4 space-x-2">
              <button
                onClick={() =>
                  (document.documentElement.className = "text-sm")
                }
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Small
              </button>
              <button
                onClick={() =>
                  (document.documentElement.className = "text-base")
                }
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Medium
              </button>
              <button
                onClick={() =>
                  (document.documentElement.className = "text-lg")
                }
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Large
              </button>
            </div>
            <button
              onClick={() => setShowTextResizer(false)}
              className="px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="relative z-20 text-black bg-white shadow-md dark:bg-gray-800 dark:text-white">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="container flex items-center justify-between py-4 lg:py-6"
        >
          {/* Logo */}
          <div className="flex flex-row gap-3">
            <img className="w-40 h-40" src={samvidhanPathLogo} alt="logo" />
            <div className="flex flex-col justify-center items-left">
              <h1 className="text-yellow-500 text-2xl font-bold">Nyaya-deep</h1>
              <h1 className="text-2xl font-bold">न्यायदिप</h1>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {NavbarMenu.map((menu) => (
                <li
                  key={menu.id}
                  className="relative group"
                  onMouseEnter={() => menu.submenu && toggleSubmenu(menu.id)}
                  onMouseLeave={() => menu.submenu && toggleSubmenu(null)}
                >
                  <button
                    onClick={() => handleMenuClick(menu.path)}
                    className="relative inline-block px-3 py-2 font-semibold transition duration-300 hover:text-yellow-600"
                  >
                    {menu.title}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                  <AnimatePresence>
                    {menu.submenu && activeMenu === menu.id && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 w-48 mt-2 bg-white border shadow-lg top-full dark:bg-gray-800 rounded"
                      >
                        {menu.submenu.map((sub, index) => (
                          <motion.li
                            key={sub.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <button
                              onClick={() => handleMenuClick(sub.path)}
                              className="block w-full px-4 py-2 text-left font-semibold hover:bg-yellow-200 hover:text-black rounded"
                            >
                              {sub.title}
                            </button>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
              <button
                className="px-4 py-2 text-white bg-yellow-500 rounded-lg font-bold hover:bg-yellow-600"
                onClick={Signupclick}
              >
                Profile
              </button>
            </ul>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <IoMdClose className="text-4xl text-yellow-500" />
              ) : (
                <IoMdMenu className="text-4xl text-yellow-500" />
              )}
            </motion.div>

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: isOpen ? "0%" : "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed top-0 right-0 z-50 flex flex-col w-4/5 h-screen gap-6 px-6 py-8 text-white bg-gray-900 shadow-lg"
            >
              <ul className="flex flex-col gap-4 mt-44">
                {NavbarMenu.map((menu) => (
                  <li key={menu.id} className="relative group">
                    <button
                      onClick={() => handleMenuClick(menu.path)}
                      className="block px-3 py-2 text-lg font-semibold hover:bg-yellow-500 rounded"
                    >
                      {menu.title}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                className="px-4 py-2 bg-yellow-500 rounded-md font-bold hover:bg-yellow-600"
                onClick={Signupclick}
              >
                Sign Up
              </button>
            </motion.div>
          </div>
        </motion.div>
      </nav>
    </>
  );
};

export default Navbar;
