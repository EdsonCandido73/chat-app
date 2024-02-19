import React from 'react';

interface Room {
  name: string;
  description: string;
}

interface RoomListProps {
  rooms: Room[];
  onJoin: (roomName: string) => void;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, onJoin }) => {
  return (
    <div className="w-11/12 max-w-96 flex flex-col items-center justify-center">
      <h2 className="text-white text-xl font-semibold mt-6 mb-2">Escolha uma sala</h2>
      <ul>
        {rooms.map((room, index) => (
          <li key={index}>            
            <button 
              className="w-full mb-2 ml-2 bg-stone-200 px-3 py-1 rounded-lg flex flex-col items-start justify-items-start" 
              onClick={() => onJoin(room.name)}
            >
              <p className="text-slate-900 text-lg font-bold text-start">{room.name}</p>
              <p className="text-slate-900 text-sm">{!room.description ? '' : 'Descrição: ' + room.description}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
