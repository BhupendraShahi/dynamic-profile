import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "../contexts/authContext";

interface SignupFormData {
  email: string;
  password: string;
  username: string;
  bio: string;
  experience: string[];
  education: string[];
  skills: string[];
}

const SignupPage: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter();

  const initialFormData: SignupFormData = {
    email: "",
    password: "",
    username: "",
    bio: "",
    experience: [],
    education: [],
    skills: [],
  };

  const [formData, setFormData] = useState<SignupFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddItem = (field: keyof SignupFormData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: [...prevFormData[field], ""],
    }));
  };

  const handleRemoveItem = (field: keyof SignupFormData, index: number) => {
    setFormData((prevFormData) => {
      const updatedField = (prevFormData[field] as string[]).filter((_, i) => i !== index);
      return {
        ...prevFormData,
        [field]: updatedField,
      };
    });
  };

  const handleItemChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof SignupFormData,
    index: number
  ) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const updatedField = [...prevFormData[field]];
      updatedField[index] = value;
      return {
        ...prevFormData,
        [field]: updatedField,
      };
    });
  };


  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://dynamic-profile.onrender.com/api/auth/signup",
        formData,
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        console.log(message);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        setError(message);
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
    setFormData(initialFormData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500">
      <div className="w-1/3 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 font-semibold">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          name="email"
          onChange={handleInputChange}
          className="mb-2 p-2 border rounded w-full"
        />

        <input
          type="username"
          placeholder="Username"
          value={formData.username}
          name="username"
          onChange={handleInputChange}
          className="mb-2 p-2 border rounded w-full"
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          name="password"
          onChange={handleInputChange}
          className="mb-2 p-2 border rounded w-full"
        />

        <textarea
          placeholder="Enter Bio"
          value={formData.bio}
          name="bio"
          onChange={handleInputChange}
          className="mb-2 p-2 border rounded w-full"
        />

        <div className="mb-2">
          <label className="block mb-2 font-semibold">Skills:</label>
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleItemChange(e, "skills", index)}
                className="p-2 border rounded w-full"
              />
              <button
                onClick={() => handleRemoveItem("skills", index)}
                className="ml-2 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-full"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => handleAddItem("skills")}
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-full"
          >
            Add Skill
          </button>
        </div>
        <div className="mb-2">
          <label className="block mb-2 font-semibold">Eduction:</label>
          {formData.education.map((education, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={education}
                onChange={(e) => handleItemChange(e, "education", index)}
                className="p-2 border rounded w-full"
              />
              <button
                onClick={() => handleRemoveItem("education", index)}
                className="ml-2 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-full"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => handleAddItem("education")}
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-full"
          >
            Add Education
          </button>
        </div>
        <div className="mb-2">
          <label className="block mb-2 font-semibold">Experience:</label>
          {formData.experience.map((experience, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={experience}
                onChange={(e) => handleItemChange(e, "experience", index)}
                className="p-2 border rounded w-full"
              />
              <button
                onClick={() => handleRemoveItem("experience", index)}
                className="ml-2 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-full"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => handleAddItem("experience")}
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-full"
          >
            Add Experience
          </button>
        </div>

        <button
          onClick={handleSignup}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/" className="text-blue-500 hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
