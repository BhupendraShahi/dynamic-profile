import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import axios from "axios";

interface Connection {
  _id: string;
  username: string;
  bio: string;
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Connections</h2>
      <div>
        <h3 className="text-lg font-semibold mb-2">Connected Users</h3>
        <ul>
          {connections.map((connection) => (
            <li key={connection._id} className="mb-4">
              <p className="text-lg font-medium">{connection.username}</p>
              <p className="text-gray-500">{connection.bio}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Non-Connected Users</h3>
        <ul>
          {nonConnections.map((nonConnection) => (
            <li key={nonConnection._id} className="mb-4">
              <p className="text-lg font-medium">{nonConnection.username}</p>
              <p className="text-gray-500">{nonConnection.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Connections;
