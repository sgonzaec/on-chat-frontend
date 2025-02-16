import { useEffect, useState } from 'react';
import { socket } from '../../infrastructure/socket/socket';
import { mapUsers } from '../../application/useCases/getUsersUseCase';
import { User } from '../../domain/models/User';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.on('updateUsers', (data: { id: string; name: string }[]) => {
      setUsers(mapUsers(data));
    });

    return () => {
      socket.off('updateUsers');
    };
  }, []);

  return users;
};