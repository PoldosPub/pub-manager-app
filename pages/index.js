import React, { useState } from 'react';

export default function Home() {
  const LoginScreen = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
      // Password per accedere all'app
      if (password === '123456') {
        onLogin();
      } else {
        setError('Password non corretta');
      }
    };

    return (
      <div className="h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 border rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Pub Manager</h1>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Inserisci la password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded"
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button 
              className="w-full bg-blue-500 text-white p-3 rounded"
              onClick={handleLogin}
            >
              Accedi
            </button>
          </div>
        </div>
      </div>
    );
  };

  const PubOrderApp = () => {
    const [tables, setTables] = useState(Array(10).fill().map(() => ({ orders: [] })));
    const [selectedTable, setSelectedTable] = useState(null);

    const menuItems = [
      "Birra Media",
      "Birra Piccola",
      "Coca Cola",
      "Acqua",
      "Patatine",
      "Hamburger",
      "Pizza"
    ];

    const addOrder = (tableIndex, item) =>
