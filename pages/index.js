import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Euro, GripHorizontal, Clock, X, ChevronDown, RotateCcw, Edit2, Minus } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// ModificationsDialog component
function ModificationsDialog({ selectedItem, setSelectedItem, showDialog, setShowDialog }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [selectedSide, setSelectedSide] = useState(null);
  const [modifications, setModifications] = useState('');
  const [customTotal, setCustomTotal] = useState(0);
  const [baseTotal, setBaseTotal] = useState(0);
  const QUICK_MODS = {
    'Tipo': ['al piatto', 'hamburger', 'salsiccia', 'cotoletta'],
    'Salse': ['Ketchup', 'Maio', 'Bbq', 'no salse'],
    'Rimozioni': ['no cipolla', 'no pomodoro', 'no insalata', 'no bacon', 'no formaggio']
  };
  const [SIDES, setSIDES] = useState([
    { id: 1, name: "Senza contorno", price: 0 },
    { id: 2, name: "Con patatine", price: 2 },
    { id: 3, name: "Con anelli di cipolla", price: 2 },
    { id: 4, name: "Con panissa", price: 2 }
  ]);

  useEffect(() => {
    if (selectedItem) {
      const total = selectedSide?.price > 0 ? selectedItem.withSidePrice : selectedItem.price;
      setBaseTotal(total);
      setCustomTotal(total);
    }
  }, [selectedItem, selectedSide]);

  const adjustTotal = (increment) => {
    setCustomTotal(prev => Math.max(0, Math.round((prev + increment) * 2) / 2));
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedItem?.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Modifiche</h3>
            {Object.entries(QUICK_MODS).map(([category, mods]) => (
              <div key={category}>
                <h4 className="text-sm font-medium text-gray-700 mb-2">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {mods.map(mod => (
                    <Button
                      key={mod}
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => setModifications(prev => prev ? `${prev}, ${mod}` : mod)}
                    >
                      {mod}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Textarea
            placeholder="Altre modifiche..."
            value={modifications}
            onChange={(e) => setModifications(e.target.value)}
            className="min-h-[80px]"
          />

          <div>
            <h3 className="font-semibold mb-3">Contorno</h3>
            <div className="space-y-3">
              {SIDES.map(side => (
                <div
                  key={side.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedSide?.id === side.id ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedSide(side)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{side.name}</span>
                    {side.price > 0 && (
                      <span className="text-gray-600">+€{side.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <span className="font-semibold">Totale</span>
            <span className="text-xl font-bold">
              €{customTotal.toFixed(2)}
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDialog(false)}>Annulla</Button>
          <Button
            onClick={() => {
              setSelectedItem({ ...selectedItem, modifications, finalPrice: customTotal });
              setShowDialog(false);
            }}
          >Conferma</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// PubSection component
function PubSection({ title, section }) {
  const DEFAULT_LAYOUTS = {
    pub: [
      { position: 0, name: 'Tavolo 1' },
      { position: 1, name: 'Tavolo 2' },
      { position: 2, name: 'Tavolo 3' }
    ],
    anna: [
      { position: 0, name: 'Tavolo 1' },
      { position: 1, name: 'Tavolo 2' }
    ]
  };

  const [tables, setTables] = useState(DEFAULT_LAYOUTS[section]);
  const calculateTotal = (orders) => orders.reduce((sum, order) => sum + order.price, 0).toFixed(2);

  return (
    <div className="w-full border rounded-lg mb-4">
      <div className="p-4 bg-gray-100">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="p-4 grid grid-cols-3 gap-4">
        {tables.map(table => (
          <Card key={table.position} className="p-4">
            <CardHeader>{table.name}</CardHeader>
            <CardContent>
              <p>Ordini: {table.orders?.length || 0}</p>
              <p>Totale: €{calculateTotal(table.orders || [])}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Main App component
export default function PubOrderApp() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 bg-white border-b">
        <h1 className="text-2xl font-bold">Gestione Ordini</h1>
      </header>
      <main className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          <PubSection title="Gestione Pub" section="pub" />
          <PubSection title="Gestione Anna" section="anna" />
        </div>
      </main>
      <ModificationsDialog
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </div>
  );
}
