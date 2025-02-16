import { useState, useEffect } from 'react';
import { socket } from './infrastructure/socket/socket';
import JoinChat from './presentation/components/JoinChat';
import UserList from './presentation/components/UserList';
import Chat from './presentation/components/Chat';
import { User } from './domain/models/User';

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    // Escuchar cambios en la lista de usuarios (Nota: Ahora escuchamos 'users' en lugar de 'userList')
    socket.on('users', (updatedUsers: User[]) => {
      console.log('Usuarios actualizados:', updatedUsers);
      setUsers(updatedUsers);
    });

    return () => {
      socket.off('users');
    };
  }, []);

  const handleJoin = (name: string) => {
    setUsername(name);
    socket.emit('join', name); // Usamos 'join' porque en el backend se emite con este evento
  };

  const handleSelectUser = (recipient: string) => {
    setSelectedUser(recipient);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      {!username ? (
        <JoinChat onJoin={handleJoin} />
      ) : selectedUser ? (
        <Chat username={username} recipient={selectedUser} />
      ) : (
        <UserList users={users} onSelectUser={handleSelectUser} />
      )}
    </div>
  );
}

export default App;