// src/components/Login.tsx
import { useState, FormEvent } from 'react';
import { User } from "../types/User";

interface LoginProps {
  onSubmit: (userData: User) => void;
  handleClickRegister(): void;
}

const Login: React.FC<LoginProps> = ({ onSubmit, handleClickRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');  

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ username, password });
  };
  
  return (
    <div className="w-96 mt-4 bg-stone-200 px-4 py-5 rounded-lg">
    <form 
        className="flex flex-col items-start justify-center gap-1" 
        onSubmit={handleSubmit}
      >
      <label className="text-sm" htmlFor='username'>Usuário</label>
      <input
        className="w-full rounded-lg py-2 px-2 text-sm"
        type="text"
        placeholder="Digite o usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label className="text-sm mt-3" htmlFor='password'>Senha</label>
      <input
        className="w-full rounded-lg py-2 px-2 text-sm"
        type="password"
        placeholder="Digite a senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button 
        type="submit"
        className="w-full mt-3 bg-slate-600 hover:bg-slate-500 font-medium text-sm py-2 px-4 rounded-lg text-white"
      >
        Login
      </button>
    </form>
    <p className="text-xs mt-2">
      Não tem cadastro? { }      
      <button className="underline" onClick={() => handleClickRegister()}>
        crie sua conta aqui
      </button>
    </p>
    </div>
  );
};

export default Login;
