import React from 'react';
import { User } from '../../domain/models/User';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => (
  <div className="p-4 bg-white rounded-md shadow-md">
    <h2 className="text-lg font-bold mb-2">Usuarios en línea:</h2>
    <ul className="space-y-1">
      {users.map((user) => (
        <li key={user.id} className="p-2 bg-gray-100 rounded">
          {user.name.name}
        </li>
      ))}
    </ul>
  </div>
);

export default UserList;