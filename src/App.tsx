import React, { useState } from 'react';
import JoinChat from './presentation/components/JoinChat';
import UserList from './presentation/components/UserList';
import { useUsers } from './adapters/hooks/useUsers';

const App: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const users = useUsers();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md">
        {connected ? <UserList users={users} /> : <JoinChat onJoin={() => setConnected(true)} />}
      </div>
    </div>
  );
};

export default App;