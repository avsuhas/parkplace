import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Login() {
  const [hasAccount, setHasAccount] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    //e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email, // should be a string like "test@gmail.com"
      password,
      options: {
        emailRedirectTo: 'http://localhost:4321'
      }
    });
  
    if (error) console.error("Signup error:", error.message);
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Logged in!");
    }
  };

  

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-slate-800 rounded shadow">
      <form onSubmit={hasAccount ? handleLogin : handleSignup}>
        <h2 className="text-xl font-semibold mb-4 text-center">
          {hasAccount ? 'Resident Login' : 'Sign Up'}
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="input mb-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input mb-4 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn-primary w-full">
          {hasAccount ? 'Login' : 'Sign Up'}
        </button>
        <p className="text-sm mt-2 text-center">
          {hasAccount ? 'No account?' : 'Already have an account?'}{' '}
          <button
            type="button"
            className="underline text-blue-500"
            onClick={() => setHasAccount(!hasAccount)}
          >
            {hasAccount ? 'Sign Up' : 'Login'}
          </button>
        </p>
        {message && (
          <p className="text-sm text-center text-red-500 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}
