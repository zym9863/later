import { useState } from 'react';
import { TimeLogEntry } from './types';
import { Header } from './components/Header';
import { TimeLogList } from './components/TimeLogList';
import { TimeLogForm } from './components/TimeLogForm';
import { TimeLogDetail } from './components/TimeLogDetail';
import { saveEntry, updateEntry, getEntryById } from './utils/storage';
import './App.css';

// Define the possible views/screens in the app
type View = 'list' | 'create' | 'edit' | 'detail';

function App() {
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);

  // Handle creating a new time log entry
  const handleCreateEntry = (entry: TimeLogEntry) => {
    saveEntry(entry);
    setCurrentView('list');
  };

  // Handle updating an existing time log entry
  const handleUpdateEntry = (entry: TimeLogEntry) => {
    updateEntry(entry);
    setCurrentView('list');
  };

  // Handle editing an entry
  const handleEdit = (id: string) => {
    setSelectedEntryId(id);
    setCurrentView('edit');
  };

  // Handle viewing an entry's details
  const handleView = (id: string) => {
    setSelectedEntryId(id);
    setCurrentView('detail');
  };

  // Handle going back to the list view
  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedEntryId(null);
  };

  // Render the appropriate view based on currentView state
  const renderView = () => {
    switch (currentView) {
      case 'create':
        return (
          <TimeLogForm
            onSave={handleCreateEntry}
            onCancel={handleBackToList}
          />
        );
      case 'edit':
        return (
          <TimeLogForm
            entry={selectedEntryId ? getEntryById(selectedEntryId) || undefined : undefined}
            onSave={handleUpdateEntry}
            onCancel={handleBackToList}
          />
        );
      case 'detail':
        return (
          <TimeLogDetail
            id={selectedEntryId || ''}
            onBack={handleBackToList}
            onEdit={handleEdit}
          />
        );
      case 'list':
      default:
        return (
          <TimeLogList
            onEdit={handleEdit}
            onView={handleView}
            onCreateNew={() => setCurrentView('create')}
          />
        );
    }
  };

  return (
    <div className="app">
      <Header onHome={handleBackToList} />
      <main className="app-content">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
