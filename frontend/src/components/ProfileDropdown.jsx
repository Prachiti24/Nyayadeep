import { useEffect, useState } from 'react';
import { FaChartLine, FaCog, FaSignOutAlt, FaTrophy, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("https://prachiti24-nyayadeep.onrender.com/api/auth/getUser", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.status === "success") {
          setUser(data.data.user);
        } else {
          console.error("Failed to fetch user data", data);
        }
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
    window.location.reload(); // Force reload to update state
  };

  const menuItems = [
    { icon: FaUser, label: 'Profile', action: () => navigate('/profile') },
    { icon: FaChartLine, label: 'Dashboard', action: () => navigate('/dashboard') },
    { icon: FaTrophy, label: 'Achievements', action: () => navigate('/achievements') },
    { icon: FaCog, label: 'Settings', action: () => navigate('/settings') },
    { icon: FaSignOutAlt, label: 'Logout', action: handleLogout, danger: true },
  ];

  if (!user) {
    return (
      <button
        onClick={() => navigate('/signin')}
        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors"
      >
        <FaUser className="w-4 h-4 mr-2" />
        Sign In
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 text-white bg-gray-600 rounded-full hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
        title="Profile Menu"
      >
        <FaUser className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Dropdown */}
          <div className="absolute right-0 z-20 w-56 mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 text-white bg-gray-600 rounded-full">
                  <FaUser className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="py-1">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    item.danger ? 'text-red-600 hover:text-red-700' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;
