import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Replace with your backend server URL
const SOCKET_URL = "http://localhost:5000";

const useWebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [classUpdates, setClassUpdates] = useState([]);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(SOCKET_URL);

    // Set socket instance in state
    setSocket(socketInstance);

    // Listen for 'classStatusUpdated' events
    socketInstance.on("classStatusUpdated", (data) => {
      console.log("Class status update received:", data);
      setClassUpdates((prevUpdates) => [...prevUpdates, data]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket, classUpdates };
};

export default useWebSocket;
