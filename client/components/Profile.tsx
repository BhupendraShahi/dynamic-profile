import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";
import Image from "next/image";
import UploadImage from "./UploadImage";
import ModalPopUp from "./ModalPopUp";

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div className="relative h-screen flex justify-center items-center bg-blue-100">
      {/* top div */}
      <div className="p-4 absolute h-1/4 inset-0 bg-blue-900 rounded-lg">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white m-4">
            My Profile
          </h2>
        </div>
      </div>

      {/* bottom div */}
      <div className="flex items-center relative bottom-0 h-[80%] bg-white p-6 rounded-lg w-[95%] shadow-2xl">
        {/* bottom div1 */}
        <div className="flex flex-col items-center justify-center w-1/2 m-8">
          <div className="flex items-center justify-between w-full m-4 p-4">
            <Image
              src={user.profilePicture}
              alt="userImage"
              height={150}
              width={150}
              className="rounded-full"
            />
            <UploadImage />
          </div>
          {/* div */}
          <div className="flex flex-col m-4 border-2 border-gray-300 w-full p-4 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 font-medium">Your Name</p>{" "}
                <span className="font-semibold">{user.username}</span>
              </div>

              <div>
                <ModalPopUp />
              </div>
            </div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 font-medium">Email</p>{" "}
                <span className="font-semibold">{user.email}</span>
              </div>

              <div>
                <ModalPopUp />
              </div>
            </div>
          </div>
          {/* div */}
          <div className="flex flex-col m-4 border-2 border-gray-300 w-full p-4 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 font-medium">About</p>{" "}
                <span className="font-semibold">{user.bio}</span>
              </div>
              <div>
                <ModalPopUp />
              </div>
            </div>
          </div>
          {/* div */}
          <div className="flex flex-col m-4 border-2 border-gray-300 w-full p-4 rounded-lg">
            <div className="flex items-start justify-between">
              <strong>Skills</strong>
              <ModalPopUp />
            </div>
            <div>
              <ul>
                {user.skills.map((skill, index) => (
                  <li key={`skill-${index}`}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* bottom div 2 */}
        <div className="flex flex-col items-start justify-start w-1/2 m-8">
          <div className="flex flex-col m-4 w-full">
            <div className="flex items-start justify-between">
              <strong className="ml-4">Experience</strong>
              <ModalPopUp />
            </div>
            <ul>
              {user.experience.map((exp, index) => (
                <li
                  className="m-4 border-2 border-gray-300 w-full p-4 rounded-lg"
                  key={`experience-${index}`}
                >
                  {exp}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col m-4 w-full">
            <div className="flex items-start justify-between">
              <strong className="ml-4">Education</strong>
              <ModalPopUp />
            </div>
            <ul>
              {user.education.map((education, index) => (
                <li
                  className="m-4 border-2 border-gray-300 w-full p-4 rounded-lg"
                  key={`experience-${index}`}
                >
                  {education}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
