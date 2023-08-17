import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-end items-center">
        {user && (
          <div className="text-white relative">
            <button
              onClick={toggleDropdown}
              className="focus:outline-none"
            >
              {user.username} <span className="hover:underline">&#x25BE;</span> {/* Downward-pointing arrow */}
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-white rounded shadow mt-1 py-2">
                <button
                  onClick={logout}
                  className="block px-4 py-2 hover:bg-gray-200 w-full text-left text-black"
                >
                  Logout
                </button>
                {/* Add more dropdown options here if needed */}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
