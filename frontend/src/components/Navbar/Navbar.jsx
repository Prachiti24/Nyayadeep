import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaHighlighter, FaTextHeight } from "react-icons/fa";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import samvidhanPathLogo from "../../assets/samvidhanpath.png";
import GoogleTranslate from "../Language";
import TextToSpeech from "../TexttoSpeach";
import ThemeChange from "../Themechange";
import ProfileDropdown from "../ProfileDropdown";

const NavbarMenu = [
  { id: 1, title: "Home", path: "/" },
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
    submenu: [
      { id: 1, title: "Case Studies", path: "/casestudies" },
      // ✅ Removed Quiz link
    ],
  },
  {
    id: 4,
    title: "Lessons",
    path: "/lessons",
    submenu: [
      { id: 1, title: "Lesson 1: Introduction to Constitution", path: "/lessons/lesson1" },
      { id: 2, title: "Lesson 2: Preamble Explained", path: "/lessons/lesson2" },
      { id: 3, title: "Lesson 3: Fundamental Rights", path: "/lessons/lesson3" },
      { id: 4, title: "Lesson 4: Directive Principles", path: "/lessons/lesson4" },
      { id: 5, title: "Lesson 5: The Constitution and Gender Justice", path: "/lessons/lesson5" },
    ],
  },
  {
    id: 5,
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
    id: 6,
    title: "Engage",
    path: "/engage",
    submenu: [
      { id: 1, title: "Discussion Forum", path: "/engage/discussionforum" },
      { id: 2, title: "Blog", path: "/engage/blog" },
      { id: 3, title: "Podcast", path: "/engage/podcast" },
      { id: 4, title: "Video", path: "/engage/video" },
    ],
  },
  { id: 7, title: "E-Books", path: "/ebooks" },
  {
    id: 8,
    title: "Games",
    path: "/games",
    // ✅ Removed Crossword, Quiz, Word Search, Puzzle
  },
  { id: 9, title: "Contact Us", path: "/contact" },
  { id: 10, title: "Sanvidhan Saathi", path: "/chatbot" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTextResizer, setShowTextResizer] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const toggleSubmenu = (menuId) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
  };

  const Signupclick = () => {
    navigate("/sign-up");
  };

  return (
    <>
      {/* Accessibility Bar */}
      <div className="text-black shadow-lg bg-yellow-50 dark:bg-gray-800 dark:text-white">
        <div className="container flex items-center justify-between px-2 text-black bg-white lg:px-5 dark:bg-gray-800 dark:text-white">
          {/* Accessibility Icons */}
          <div className="flex items-center space-x-4 text-gray-700 bg-white dark:bg-gray-800 dark:text-white" >
            <FaHighlighter size={24} className="cursor-pointer hover:text-black dark:hover:text-white" title="Highlight Text" />
            <FaTextHeight
              size={24}
              className="cursor-pointer hover:text-black dark:hover:text-white"
              title="Text Resize"
              onClick={() => setShowTextResizer(true)}
            />
            <TextToSpeech />
            <ThemeChange/>
          </div>
          {/* Google Translate */}
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
                onClick={() => document.documentElement.className = "text-sm"}
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Small
              </button>
              <button
                onClick={() => document.documentElement.className = "text-base"}
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Medium
              </button>
              <button
                onClick={() => document.documentElement.className = "text-lg"}
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

      <nav className="relative z-20 text-black bg-white shadow-md dark:bg-gray-800 dark:text-white">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="container flex items-center justify-between py-4 lg:py-6"
        >
          {/* Logo section */}
          <div className="flex flex-row gap-2">
            <img className="w-auto h-16" src={samvidhanPathLogo} alt="logo" />
            <div className="flex flex-col justify-center items-left">
              <h1 className="text-xl font-bold">Nyayadeep</h1>
              <h1 className="text-xl font-bold">न्यायदिप</h1>

            </div>
          </div>
          {/* Menu section */}
          <div className="hidden text-black bg-white lg:block dark:bg-gray-800 dark:text-white">
            <ul className="flex items-center gap-3 text-black bg-white dark:bg-gray-800 dark:text-white">
              {NavbarMenu.map((menu) => (
                <li
                  key={menu.id}
                  className="relative text-black bg-white group dark:bg-gray-800 dark:text-white"
                  onMouseEnter={() => menu.submenu && toggleSubmenu(menu.id)}
                  onMouseLeave={() => menu.submenu && toggleSubmenu(null)}
                >
                  <button
                    onClick={() => handleMenuClick(menu.path)}
                    className="relative inline-block px-2 py-1 text-base dark:hover:bg-gray-800 hover:text-secondary"
                  >
                    {menu.title}
                  </button>
                  {/* Dropdown for submenu */}
                  <AnimatePresence>
                    {menu.submenu && activeMenu === menu.id && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 w-48 mt-2 text-black bg-white border shadow-lg top-full dark:bg-gray-800 dark:text-white"
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
                              className="block w-full px-4 py-2 text-left dark:hover:bg-gray-800 hover:bg-gray-100 hover:text-secondary"
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
              <ProfileDropdown />
            </ul>
          </div>
        </motion.div>
      </nav>
    </>
  );
};

export default Navbar;
