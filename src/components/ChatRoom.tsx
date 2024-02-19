import React, { useState, useEffect, useRef } from 'react';
import { Message } from "../types/Message";
import { chatMock } from '../mock/chatMok';

interface ChatRoomProps {
  username: string
  roomName: string
  closeChatRoom(): void
}

const ChatRoom: React.FC<ChatRoomProps> = ({username, roomName, closeChatRoom}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessages = [...messages, { user: username, message }]
      setMessages(newMessages);
      localStorage.setItem('chatRoomMessages', JSON.stringify(newMessages))
      setMessage('');
      const randomIndex = Math.floor(Math.random() * chatMock.length);
      const responseMessage = [...newMessages, { user: chatMock[randomIndex].user, message: chatMock[randomIndex].message }];
      setTimeout(() => {
        setMessages(responseMessage);
        localStorage.setItem('chatRoomMessages', JSON.stringify(responseMessage))
      }, 2000);
    }    
  };
  
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const savedRoomMessages = localStorage.getItem('chatRoomMessages');
    if (savedRoomMessages) {
      setMessages(JSON.parse(savedRoomMessages));
    }
  }, []);

  return (
    <div className="w-4/5 h-[70vh]">
      <div className="flex flex-row justify-between t">
        <h1 className="font-bold text-xl text-white"> Sala: {roomName} </h1>
        <button className="text-white text-sm" onClick={() => closeChatRoom()}>Sair da Sala</button>
      </div>
      <div className="w-auto h-full overflow-y-auto scrollbar-w-1 scrollbar-thumb-rounded-full mt-1 bg-stone-200 px-4 py-5 rounded-lg">
        {messages.map((msg, index) => 
        <>
          {(msg.user === username) ? (
          <div className="flex justify-end">
            <div key={index} className="mb-2 p-3 w-[50vw] rounded-lg rounded-br-none bg-slate-700 text-white">
              <strong className="text-xs">{msg.user}</strong>
              <p>{msg.message}</p> 
            </div>
          </div>
          ) :
          (
            <div className="flex justify-start">
              <div key={index} className="mb-2 p-3 w-[50vw] rounded-lg rounded-bl-none bg-slate-500 text-white">
              <strong className="text-xs">{msg.user}</strong>
              <p>{msg.message}</p> 
              </div>
            </div>
            )}
        </>)}
        <div ref={messagesEndRef} />
      </div>
      <form className='w-full flex flex-row mt-px' onSubmit={handleSubmit}>
        <input
          className='w-full p-3 rounded-lg'
          type="text"
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="ml-1 p-3 bg-slate-700 text-white rounded-lg" type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ChatRoom;
