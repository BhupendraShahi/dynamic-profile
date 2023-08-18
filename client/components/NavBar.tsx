import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";
import Image from "next/image";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  console.log(user, "user");
  {
    console.log(user?.profilePicture, "DP");
  }
  return (
    <nav className="bg-white p-4 border-b-2 my-2">
      <div className="container mx-auto flex justify-end items-center">
        {user && (
          <div className="flex justify-start text-black relative border-2 border-gray-200 rounded-lg">
            <Image
              className="rounded-xl border-black mr-4"
              src={user.profilePicture}
              height={48}
              width={48}
              alt={"DP"}
            />
            <div className="flex flex-col justify-center items-start w-full mr-2">
              <p className="text-xs">Welcome back,</p>
              <p className="text-XL">{user.username}</p>
            </div>
            <button onClick={toggleDropdown} className="focus:outline-none m-2">
              <span className="hover:underline">&#x25BE;</span>
              {/* Downward-pointing arrow */}
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-white rounded shadow mt-1 py-2">
                <button
                  onClick={logout}
                  className="block px-4 py-2 hover:bg-gray-200 w-full text-left text-black"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
