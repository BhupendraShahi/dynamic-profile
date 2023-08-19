import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/authContext";

const UploadImage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilename(selectedFile.name);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/bhupi/image/upload",
        formData, { withCredentials: true }
      );

      if (user) {
        user.profilePicture = response.data.url;
        const { data } = await axios.put(
          "https://dynamic-profile.onrender.com/api/profile/update-profile",
          {
            ...user,
          },
          { withCredentials: true }
        );
        user.profilePicture = data.user.profilePicture;
      }
    } catch (error) {
      console.error(error);
    }

    setFile(null);
    setFilename("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          id="123wer4t56"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <label>{filename}</label>
      </div>
      <button
        className="text-blue-500 px-4 py-1 mt-2 rounded-2xl bg-blue-100 hover:bg-blue-800 hover:text-white"
        type="submit"
      >
        Upload
      </button>
    </form>
  );
};

export default UploadImage;
