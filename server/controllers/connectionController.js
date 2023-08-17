import User from "../models/User.js";

export const addConnection = async (req, res) => {
  try {
    const { connectionId } = req.body;

    // Find the user who wants to add a connection
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the connectionId is already in the user's connections array
    if (user.connections.includes(connectionId)) {
      return res.status(400).json({
        success: false,
        message: "Connection already exists",
        updatedConnections: user.connections,
      });
    }

    // Update the user's connections array
    user.connections.push(connectionId);
    await user.save();

    res.json({
      success: true,
      message: "Connection added successfully",
      updatedConnections: user.connections
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add connection" });
  }
};

export const removeConnection = async (req, res) => {
  try {
    const { connectionId } = req.body;

    // Find the user who wants to remove a connection
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the connectionId is present in the user's connections array
    const connectionIndex = user.connections.indexOf(connectionId);
    if (connectionIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Connection not found"
      });
    }

    // Remove the connectionId from the user's connections array
    user.connections.splice(connectionIndex, 1);
    await user.save();

    res.json({ success: true, message: "Connection removed successfully", updatedConnections: user.connections});
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to remove connection" });
  }
};

export const getAllConnections = async (req, res) => {
  try {
    const userId  = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const connections = user.connections || [];

    const nonConnections = await User.find({
      _id: { $ne: user._id, $nin: connections },
    });

    const connectionData = connections.map(connection => ({
      username: connection.username,
      bio: connection.bio,
    }));

    const nonConnectionData = nonConnections.map(nonConnection => ({
      username: nonConnection.username,
      bio: nonConnection.bio,
    }));

    res.json({ success: true, connections: connectionData, nonConnections: nonConnectionData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
