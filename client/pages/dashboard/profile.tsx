import React from 'react';
import { useAuth } from '../../contexts/authContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Your Profile</h2>
      {/* <img src={user?.profilePicture?} alt="Profile" className="mb-4" /> */}
      {/* Display other user data like username, bio, experience, education, skills */}
    </div>
  );
};

export default ProfilePage;
