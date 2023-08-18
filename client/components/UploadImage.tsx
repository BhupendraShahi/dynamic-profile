import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/authContext";

const UploadImage: React.FC = () => {
  const { user } = useAuth();
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
    console.log(file);
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/bhupi/image/upload",
        formData
      );
      console.log(user);
      console.log(response);
      if (user) {
        console.log(user, "user");
        user.profilePicture = response.data.url;
        await axios.put(
          "http://localhost:8080/api/profile/update-profile",
          {
            ...user,
          },
          { withCredentials: true }
        );
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
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <label>{filename}</label>
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadImage;
