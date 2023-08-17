import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";
import Modal from "./Modal";
import EditProfileModal from "./EditProfileModal";

const Profile: React.FC = () => {
  const { user } = useAuth();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  if (!user) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div className="p-4">
      <div>
        <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      </div>

      <div className="flex flex-col border p-4 m-4 rounded-lg">
        <div className="border p-4 rounded-md">
          <div className="mb-4">
            <p className="text-gray-600 font-medium">Your Name</p>{" "}
            <span className="font-semibold">{user.username}</span>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 font-medium">Email</p>{" "}
            <span className="font-semibold">{user.email}</span>
          </div>
        </div>

        <div className="border p-4 mt-4 rounded-lg">
          <div className="mb-4">
            <p className="text-gray-600 font-medium">
              About <span>{user.username}</span>
            </p>{" "}
            <span className="font-semibold">{user.bio}</span>
          </div>
        </div>

        <div className="border p-4 mt-4 rounded-lg">
          <div className="flex flex-col items-start justify-start mb-4">
            <p className="text-gray-600 font-medium">Skills</p>
            {user.skills.join(" ")}
          </div>
        </div>

        <div className="mb-4">
          <strong>Experience:</strong>
          <ul>
            {user.experience.map((exp, index) => (
              <li key={`experience-${index}`}>{exp}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <strong>Education:</strong>
          <ul>
            {user.education.map((edu, index) => (
              <li key={`education-${index}`}>{edu}</li>
            ))}
          </ul>
        </div>
      </div>
      <button
        onClick={handleEditModalOpen}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Edit Profile
      </button>

      <Modal isOpen={isEditModalOpen} onClose={handleEditModalClose}>
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          user={user}
        />
      </Modal>
    </div>
  );
};

export default Profile;
