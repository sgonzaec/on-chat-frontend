import { useState, useEffect } from "react";
import { socket } from "../../infrastructure/socket/socket";

interface Message {
  sender: string;
  content: string;
}

interface ChatProps {
  username: string;
  recipient: string; // Usuario con quien se está chateando
}

const Chat: React.FC<ChatProps> = ({ username, recipient }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.on("privateMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("privateMessage");
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const message: Message = {
      sender: username,
      content: newMessage,
    };

    socket.emit("sendPrivateMessage", {
      recipient,
      message,
    });

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Chat with {recipient}</h2>
      <div className="h-64 overflow-y-auto bg-white p-2 border rounded">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded ${
              msg.sender === username
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-300 text-black self-start"
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;