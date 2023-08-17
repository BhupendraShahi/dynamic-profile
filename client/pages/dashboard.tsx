import React, { useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import SideNavBar from '@/components/SideNavBar';
import NavBar from '@/components/NavBar';
import Profile from '@/components/Profile';
import Connections from '@/components/Connections';

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [activeComponent, setActiveComponent] = useState<'profile' | 'connection'>('profile');

  const renderActiveComponent = () => {
    if (activeComponent === 'profile') {
      return <Profile />;
    } else if (activeComponent === 'connection') {
      return <Connections />;
    }
  };

  return (
    <div className="flex">
      <SideNavBar setActiveComponent={setActiveComponent} />
      <div className="flex-grow">
        <NavBar />
        <div className="p-4">{renderActiveComponent()}</div>
      </div>
    </div>
  );
};

export default DashboardPage;
