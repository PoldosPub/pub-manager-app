import React, { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tables, setTables] = useState(
    Array(10).fill().map(() => ({ orders: [] }))
  );
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

  const addOrder = (item) => {
    if (selectedTable !== null) {
      const newTables = [...tables];
      newTables[selectedTable].orders.push({ item, id: Date.now() });
      setTables(newTables);
    }
  };

  const removeOrder = (orderId) => {
    if (selectedTable !== null) {
      const newTables = [...tables];
      newTables[selectedTable].orders = newTables[selectedTable].orders.filter(
        order => order.id !== orderId
      );
      setTables(newTables);
    }
  };

  function LoginScreen({ onLogin }) {
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
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white border rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Pub Manager</h1>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Inserisci la password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button 
              className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              onClick={handleLogin}
            >
              Accedi
            </button>
          </div>
        </div>
      </div>
    );
  }

  function PubOrderApp() {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Gestione Ordini Pub</h1>
        
        {/* Griglia Tavoli */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {tables.map((table, index) => (
            <button
              key={index}
              onClick={() => setSelectedTable(index)}
              className={`p-4 text-left border rounded-lg ${
                selectedTable === index 
                  ? 'bg-blue-100 border-blue-500' 
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <h2 className="font-bold">Tavolo {index + 1}</h2>
              <p className="text-gray-600">Ordini: {table.orders.length}</p>
            </button>
          ))}
        </div>

        {/* Sezione Ordini */}
        {selectedTable !== null && (
          <div className="mt-6 bg-white p-4 rounded-lg border">
            <h2 className="text-xl font-bold mb-4">
              Ordini Tavolo {selectedTable + 1}
            </h2>
            
            {/* Menu Items */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => addOrder(item)}
                  className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Lista Ordini */}
            <div className="space-y-2">
              {tables[selectedTable].orders.map((order) => (
                <div 
                  key={order.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <span>{order.item}</span>
                  <button
                    onClick={() => removeOrder(order.id)}
                    className="text-red-500 hover:text-red-600 px-3 py-1"
                  >
                    Elimina
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return <PubOrderApp />;
}
