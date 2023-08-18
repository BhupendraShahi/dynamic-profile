import Link from "next/link";
import React, { useState } from "react"; // Import useState
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/router";

interface SideNavBarProps {
  setActiveComponent: (component: "profile" | "connection") => void;
}

const SideNavBar: React.FC<SideNavBarProps> = ({ setActiveComponent }) => {
  const { logout } = useAuth();
  const router = useRouter();

  const [activeItem, setActiveItem] = useState<"profile" | "connection">(
    "profile"
  ); // Add state for active item

  const handleItemClick = (component: "profile" | "connection") => {
    setActiveComponent(component);
    setActiveItem(component);
  };

  return (
    <div className="bg-white h-screen w-6/1 py-4 px-2 flex flex-col justify-between border-r-2">
      <div className="flex w-full flex-col justify-center items-center">
        <h2 className="flex items-center justify-center w-48 text-black text-2xl font-semibold border-2 rounded-md p-2 my-2 mx-2">
          Dashboard
        </h2>
        <ul className="flex flex-col w-full items-start justify-start text-black pt-8 ml-16">
          <li className="flex items-center justify-start">
            <span
              className={`text-xl font-extrabold ${
                activeItem === "profile" ? "text-blue-600" : ""
              }`}
            >
              &gt;
            </span>
            <Link
              href="#profile"
              className={`w-full px-8 py-2 hover:bg-gray-300 hover:border-2 hover:border-blue-600 rounded-md block text-xl ml-4 ${
                activeItem === "profile" ? "border-2 border-blue-600 text-blue-600" : ""
              }`}
              onClick={() => handleItemClick("profile")} 
            >
              My Profile
            </Link>
          </li>
          <li className="flex items-center justify-start">
            <span
              className={`text-xl font-extrabold ${
                activeItem === "connection" ? "text-blue-600" : ""
              }`}
            >
              &gt;
            </span>
            <Link
              href="#connection"
              className={`w-full px-4 py-2 hover:bg-gray-300 hover:border-2 hover:border-blue-600 rounded-md block text-xl ml-4 ${
                activeItem === "connection" ? "border-2 border-blue-600 text-blue-600" : ""
              }`}
              onClick={() => handleItemClick("connection")} 
            >
              Connections
            </Link>
          </li>
        </ul>
      </div>
      <div className="text-center py-2">
        <button
          onClick={logout}
          className="text-blue-500 px-4 py-2 rounded-2xl bg-blue-100 hover:bg-blue-800 hover:text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideNavBar;
