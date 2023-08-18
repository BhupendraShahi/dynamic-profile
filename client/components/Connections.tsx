import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import axios from "axios";
import Image from "next/image";

interface Connection {
  _id: string;
  username: string;
  bio: string;
  profilePicture: string;
}

const Connections: React.FC = () => {
  const { user } = useAuth();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [nonConnections, setNonConnections] = useState<Connection[]>([]);

  useEffect(() => {
    const getConnections = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/connection/get-connections",
          { withCredentials: true }
        );
        if (response.data.success) {
          setConnections(response.data.connections);
          setNonConnections(response.data.nonConnections);
        } else {
          console.log("Failed to fetch connections");
        }
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };

    if (user) {
      getConnections();
    }
  }, [user]);

  const handleConnect = async (connectionId: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/connection/add-connection",
        { connectionId },
        { withCredentials: true }
      );
      if (response.data.success) {
        setConnections([response.data.updatedConnections]);
        setNonConnections(nonConnections.filter((c) => c._id !== connectionId));
        console.log(connections, "connections con");
        console.log(nonConnections, "nonConnections con");
      }
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };

  useEffect(() => {
    
  }, [connections, nonConnections]);
  
  
  const handleDisconnect = async (connectionId: string) => {
    try {
      console.log(connectionId, "value of connection id passed dis");
      const response = await axios.put(
        "http://localhost:8080/api/connection/remove-connection",
        { connectionId },
        { withCredentials: true }
      );
      if (response.data.success) {
        setConnections(connections.filter((c) => c._id !== connectionId));
        setNonConnections([response.data.updatedConnections]);
        console.log(connections, "connections dis");
        console.log(nonConnections, "nonConnections dis");
      }
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };



  return (
    <div className="p-4 bg-blue-100">
      <h2 className="text-2xl font-semibold mb-4 bg-blue-900 p-8 rounded-lg text-white">
        My Connections
      </h2>
      <div>
        <ul className="flex flex-wrap m-8 p-8">
          {connections.map((connection) => (
            <li
              className="flex mb-8 mr-8 p-4 justify-between rounded-lg border-2 border-blue-500 h-1/3 w-1/4"
              key={connection._id}
            >
              <div className="flex flex-col items-start justify-center">
                <div>
                  <p className="text-lg font-medium">
                    {connection.username}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">{connection.bio}</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => handleDisconnect(connection._id)}
                    className="text-black px-4 py-2 rounded-2xl bg-blue-300 hover:bg-blue-800 hover:text-white"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={connection.profilePicture}
                  alt="user image"
                  height={150}
                  width={150}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">
          People you can also connect
        </h3>

        <ul className="flex flex-wrap m-8 p-8">
          {nonConnections.map((nonConnection) => (
            <li
              className="flex mb-8 mr-8 p-4 justify-between rounded-lg border-2 border-blue-500 h-1/3 w-1/4"
              key={nonConnection._id}
            >
              <div className="flex flex-col items-start justify-center">
                <div>
                  <p className="text-lg font-medium">
                    {nonConnection.username}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">{nonConnection.bio}</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => handleConnect(nonConnection._id)}
                    className="text-black px-4 py-2 rounded-2xl bg-blue-300 hover:bg-blue-800 hover:text-white"
                  >
                    Connect
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={nonConnection.profilePicture}
                  alt="user image"
                  height={150}
                  width={150}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Connections;
