import React, { useState } from 'react';
import JournalFeed from './components/JournalFeed';
import EntryForm from './components/EntryForm';
import MapView from './components/MapView';
import './App.css';

function App() {
  const [page, setPage] = useState('feed'); // feed, add-entry, map, detail
  const [selectedEntryId, setSelectedEntryId] = useState(null);
  const [entries, setEntries] = useState([]);

  const handleAddEntry = () => {
    setPage('add-entry');
  };

  const handleViewEntry = (entryId) => {
    setSelectedEntryId(entryId);
    setPage('detail');
  };

  const handleSubmitEntry = async (entryData) => {
    try {
      const method = entryData._id ? 'PUT' : 'POST';
      const url = entryData._id
        ? `/api/entries/${entryData._id}`
        : '/api/entries';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entryData),
      });

      if (!response.ok) {
        throw new Error('Failed to save entry');
      }

      setPage('feed');
      // Refresh entries
      await fetchEntries();
    } catch (error) {
      throw error;
    }
  };

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/entries');
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Failed to fetch entries:', error);
    }
  };

  const getSelectedEntry = () => {
    return entries.find((entry) => entry._id === selectedEntryId);
  };

  return (
    <div className="App">
      <nav className="app-nav">
        <div className="nav-content">
          <div className="nav-brand" onClick={() => setPage('feed')}>
            🗺️ Travel Journal
          </div>
          <div className="nav-links">
            <button
              className={`nav-link ${page === 'feed' ? 'active' : ''}`}
              onClick={() => setPage('feed')}
            >
              Trips
            </button>
            <button
              className={`nav-link ${page === 'map' ? 'active' : ''}`}
              onClick={() => setPage('map')}
            >
              Map
            </button>
            <button
              className="nav-link nav-add"
              onClick={handleAddEntry}
            >
              + New Entry
            </button>
          </div>
        </div>
      </nav>

      <main className="app-main">
        {page === 'feed' && (
          <JournalFeed
            onAddEntry={handleAddEntry}
            onViewEntry={handleViewEntry}
          />
        )}

        {page === 'add-entry' && (
          <EntryForm
            onSubmit={handleSubmitEntry}
            onCancel={() => setPage('feed')}
          />
        )}

        {page === 'map' && (
          <div className="map-page">
            <MapView
              entries={entries}
              onMarkerClick={handleViewEntry}
            />
          </div>
        )}

        {page === 'detail' && getSelectedEntry() && (
          <div className="detail-page">
            <button
              className="detail-back"
              onClick={() => setPage('feed')}
            >
              ← Back
            </button>
            <div className="detail-container">
              <h1>{getSelectedEntry().title}</h1>
              <div className="detail-meta">
                <span>📅 {new Date(getSelectedEntry().startDate).toLocaleDateString()}</span>
                <span>📍 {getSelectedEntry().location}</span>
                <span>⭐ {getSelectedEntry().rating}/5</span>
              </div>
              <p>{getSelectedEntry().description}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
