import { io } from 'socket.io-client';

export const socket = io('http://localhost:3000'); // Asegúrate de que este puerto es el correcto

socket.on('connect', () => {
  console.log('Conectado al servidor');
});

socket.on('userList', (users) => {
  console.log('Usuarios en línea:', users);
});