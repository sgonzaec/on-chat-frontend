import React from 'react';
import { User } from '../../domain/models/User';

interface UserListProps {
  users: User[];
  onSelectUser: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onSelectUser }) => (
  <div className="p-4 bg-white rounded-md shadow-md">
    <h2 className="text-lg font-bold mb-2">Usuarios en línea:</h2>
    <ul className="space-y-1">
      {users.length === 0 ? (
        <p className="text-gray-500">No hay usuarios en línea</p>
      ) : (
        users.map((user) => (
          <li
            key={user.socketId}
            className="p-2 bg-gray-100 rounded flex justify-between items-center cursor-pointer hover:bg-gray-200"
            onClick={() => onSelectUser(user.socketId)}
          >
            {user.name}
            <button className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
              Chat
            </button>
          </li>
        ))
      )}
    </ul>
  </div>
);

export default UserList;