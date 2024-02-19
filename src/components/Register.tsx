import { useState, FormEvent } from 'react';
import { User } from "../types/User";

interface RegisterProps {
  onSubmit: (userData: User) => void;
  handleClickLogin(): void;
}

const Register: React.FC<RegisterProps> = ({ onSubmit, handleClickLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === checkPassword) {
      onSubmit({ username, password, email });
    } else {
      alert('Senha e confirmação diferentes! Verifique.')
    }
  };

  return (
    <div className="w-11/12 max-w-96 mt-4 bg-stone-200 px-4 py-5 rounded-lg">
      <form 
        className="flex flex-col items-start justify-center gap-2" 
        onSubmit={handleSubmit}
      >
        <label className="text-sm" htmlFor='username'>Usuário</label>
        <input
          className="w-full rounded-lg py-2 px-2 text-sm"
          type="text"
          placeholder="Digite o usuário"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="text-sm mt-2" htmlFor='email'>e-mail</label>
        <input
          className="w-full rounded-lg py-2 px-2 text-sm"
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="text-sm mt-2" htmlFor='password'>Senha</label>
        <input
          className="w-full rounded-lg py-2 px-2 text-sm"
          type="password"
          placeholder="Digite uma senha segura"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="text-sm mt-2" htmlFor='checkPassword'>Confirmar senha</label>
        <input
          className="w-full rounded-lg py-2 px-2 text-sm"
          type="password"
          placeholder="Confirme a senha digitada"
          value={checkPassword}
          required
          onChange={(e) => setCheckPassword(e.target.value)}
        />
        <button 
          type="submit"
          className="w-full mt-2 bg-slate-600 hover:bg-slate-500 font-medium text-sm py-2 px-4 rounded-lg text-white"
        >
          Registrar
        </button>
      </form>
      <p className="text-xs mt-2">
        Já tem conta? { }      
        <button className="underline" onClick={() => handleClickLogin()}>
          fazer login
        </button>
      </p>
    </div>
  );
};

export default Register;
