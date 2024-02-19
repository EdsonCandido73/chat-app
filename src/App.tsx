import React, { useState, useEffect  } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import { User } from "./types/User";

const App: React.FC = () => {
  const [user, setUser] = useState<{ username: string; password: string } | null>(null);      
  const [register, setRegister] = useState(false);
   
  const handleLogin = (userData: User) => {
    const { username, password } = userData;

    if (username.toLowerCase() === 'admin' && password === 'Teste123') {
      setUser({username, password});
      localStorage.setItem('username', username);    
    } else {
      alert('Login incorreto, tente novamente.')
    }    
  };

  const handleRegister = (userData: User) => {    
    const { username, password } = userData;
    setUser({username, password});
    localStorage.setItem('username', username);
    setRegister(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('username');
  }
     
  useEffect(() => {    
    const localusername = localStorage.getItem('username');    
    if (localusername) {
      setUser({username: localusername, password: 'local'});
    }
  }, []);

  return (
    <div>
      <header className="bg-gray-800 text-white p-4 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <img src="Logo.png" alt="Logo" className="h-9 ml-2 mr-3 bg-transparent" />
          <h1 className="text-lg font-semibold">Live Chat</h1>            
        </div>
        {user && (
          <div className="mr-2 flex flex-row items-center">
            <h2 className="text-white text-base font-semibold mr-4">Olá, {user.username}!</h2>
            <h2 className="mr-4 text-gray-950 text-3xl"> | </h2>
            <button className="flex flex-row items-center justify-between" onClick={() => logout()}>
              <svg className="w-4 h-4 text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"/>
              </svg>
              Sair
            </button>
          </div>
        )}
      </header>
      <div className="bg-slate-900 pt-8 min-h-screen w-full flex flex-col items-center">
        {(!user && !register) ? (
          <>          
            <h1 className="font-bold text-[2rem] text-white"> Login </h1>
            <Login 
              onSubmit={handleLogin}
              handleClickRegister={() => setRegister(!register)}
            />          
          </>
        ) : (!user && register) ? (
          <>          
            <h1 className="font-bold text-[2rem] text-white"> Criar conta </h1>
            <Register 
              onSubmit={handleRegister}
              handleClickLogin={() => setRegister(!register)}          
            />          
          </>
        ) : null }        
        
      </div>
    </div>
  );
};

export default App;
