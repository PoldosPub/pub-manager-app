import React, { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const addOrder = (tableIndex, item) => {
    const newTables = [...tables];
    newTables[tableIndex].orders.push({ item, id: Date.now() });
    setTables(newTables);
  };

  const removeOrder = (tableIndex, orderId) => {
    const newTables = [...tables];
    newTables[tableIndex].orders = newTables[tableIndex].orders.filter(
      order => order.id !== orderId
    );
    setTables(newTables);
  };

  const LoginScreen = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
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

  const PubOrderApp = () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Gestione Ordini Pub</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {tables.map((table, index) => (
          <div
            key={index}
            c
