import Link from "next/link";
import React from "react";
import { useAuth } from "@/contexts/authContext";

interface SideNavBarProps {
  setActiveComponent: (component: 'profile' | 'connection') => void;
}

const SideNavBar: React.FC<SideNavBarProps> = ({ setActiveComponent }) => {
  const { logout } = useAuth();

  return (
    <div className="bg-blue-500 h-screen w-1/4 py-4 px-2 flex flex-col justify-between">
    <div>
      <h2 className="text-white text-lg font-semibold mb-4 px-4">Dashboard</h2>
      <ul className="text-white">
        <li className="mb-2 px-4 py-2 hover:bg-blue-600 rounded">
            <a href="#" className="block" onClick={() => setActiveComponent('profile')}>
              Profile
            </a>
          </li>
          <li className="mb-2 px-4 py-2 hover:bg-blue-600 rounded">
            <a href="#" className="block" onClick={() => setActiveComponent('connection')}>
              Connections
            </a>
          </li>

      </ul>
    </div>
    <div className="text-center py-2">
      <button onClick={logout} className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100">
        Logout
      </button>
    </div>
    
  </div>
  );
};

export default SideNavBar;
