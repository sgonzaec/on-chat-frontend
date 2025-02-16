import React, { useState } from 'react';
import { socket } from '../../infrastructure/socket/socket';

interface JoinChatProps {
  onJoin: (name: string) => void;
}

const JoinChat: React.FC<JoinChatProps> = ({ onJoin }) => {
  const [name, setName] = useState('');

  const handleJoin = () => {
    if (name.trim()) {
      socket.emit('register', { name }); // Informar al backend
      onJoin(name); // Notificar al componente padre
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-md shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to OnChat</h2>
      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded mb-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={handleJoin}
        className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Join Chat
      </button>
    </div>
  );
};

export default JoinChat;