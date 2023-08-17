import React, { useState } from "react";
import Modal from "./Modal"; // Import your modal component or library here
import axios from "axios";
import { useAuth } from "@/contexts/authContext";

interface User {
  id: string;
  email: string;
  username: string;
  bio: string;
  skills: string[];
  experience: string[];
  education: string[];
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const { updateUser } = useAuth();
  const [editedUser, setEditedUser] = useState<User>({
    ...user,
    skills: user.skills.slice(),
    experience: user.experience.slice(),
    education: user.education.slice(),
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof User,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (
      fieldName === "skills" ||
      fieldName === "experience" ||
      fieldName === "education"
    ) {
      setEditedUser((prevUser) => {
        const updatedArray = prevUser[fieldName].slice();
        updatedArray[index!] = value;

        return {
          ...prevUser,
          [fieldName]: updatedArray,
        };
      });
    } else {
      setEditedUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleAddField = (fieldName: keyof User) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      [fieldName]: [...prevUser[fieldName], ""],
    }));
  };

  const handleRemoveField = (fieldName: keyof User, index: number) => {
    setEditedUser((prevUser) => {
      const updatedArray = prevUser[fieldName].filter((_, i) => i !== index);
      return {
        ...prevUser,
        [fieldName]: updatedArray,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8080/api/profile/update-profile",
        editedUser,
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log("Profile updated successfully");
        updateUser(editedUser);
        onClose();
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={editedUser.username}
              onChange={(e) => handleInputChange(e, "username")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedUser.email}
              disabled
              className="w-full p-2 border rounded opacity-75"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="bio" className="block font-medium mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={editedUser.bio}
              onChange={(e) => handleInputChange(e, "bio")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="skills" className="block font-medium mb-1">
              Skills (separate with newlines)
            </label>
            {editedUser.skills.map((skill, index) => (
              <div key={`skills-${index}`} className="flex mb-2">
                <textarea
                  id={`skills-${index}`}
                  name={`skills-${index}`}
                  value={skill}
                  onChange={(e) => handleInputChange(e, "skills", index)}
                  className="flex-1 p-2 border rounded"
                  rows={2}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField("skills", index)}
                  className="ml-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("skills")}
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add Skill
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="education" className="block font-medium mb-1">
              Education (separate with newlines)
            </label>
            {editedUser.education.map((education, index) => (
              <div key={`education-${index}`} className="flex mb-2">
                <textarea
                  id={`education-${index}`}
                  name={`education-${index}`}
                  value={education}
                  onChange={(e) => handleInputChange(e, "education", index)}
                  className="flex-1 p-2 border rounded"
                  rows={2}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField("education", index)}
                  className="ml-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("education")}
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add Education
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="experience" className="block font-medium mb-1">
              Experience (separate with newlines)
            </label>
            {editedUser.experience.map((experience, index) => (
              <div key={`experience-${index}`} className="flex mb-2">
                <textarea
                  id={`experience-${index}`}
                  name={`experience-${index}`}
                  value={experience}
                  onChange={(e) => handleInputChange(e, "experience", index)}
                  className="flex-1 p-2 border rounded"
                  rows={2}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField("experience", index)}
                  className="ml-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("experience")}
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add Experience
            </button>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
