import React, { useState } from "react";
import Modal from "./Modal";
import EditProfileModal from "./EditProfileModal";
import { useAuth } from "@/contexts/authContext";

const ModalPopUp = () => {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };
  return (
    <>
      <button
        onClick={handleEditModalOpen}
        className="text-blue-500 px-4 py-2 rounded-2xl bg-blue-100 hover:bg-blue-800 hover:text-white"
      >
        Edit
      </button>
      {user && (
        <Modal isOpen={isEditModalOpen} onClose={handleEditModalClose}>
          <EditProfileModal
            isOpen={isEditModalOpen}
            onClose={handleEditModalClose}
            user={user}
          />
        </Modal>
      )}
    </>
  );
};

export default ModalPopUp;
