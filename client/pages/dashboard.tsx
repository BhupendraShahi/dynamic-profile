import React, { useState } from 'react';
import { useRouter } from 'next/router';;
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
        <div>{renderActiveComponent()}</div>
      </div>
    </div>
  );
};

export default DashboardPage;
