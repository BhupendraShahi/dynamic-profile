import React from 'react';
import { useAuth } from '../../contexts/authContext';

const ConnectionPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Your Connections</h2>
      {/* Display user's connections */}
    </div>
  );
};

export default ConnectionPage;
