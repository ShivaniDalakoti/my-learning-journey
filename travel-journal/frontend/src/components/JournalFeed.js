import React, { useState, useEffect } from 'react';
import TripCard from './TripCard';
import './JournalFeed.css';

function JournalFeed({ onAddEntry, onViewEntry }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/entries');
      const data = await response.json();
      setEntries(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch entries:', error);
      setLoading(false);
    }
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch = entry.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLocation = !filterLocation ||
      entry.location.toLowerCase().includes(filterLocation.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="journal-feed">
      <div className="feed-header">
        <h1>Travel Journal</h1>
        <p>Capture your adventures</p>
      </div>

      <div className="feed-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search trips..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          className="filter-input"
          placeholder="Filter by location..."
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading">Loading your trips...</div>
      ) : filteredEntries.length === 0 ? (
        <div className="empty-state">
          <p>No trips found yet!</p>
          <button className="btn btn-primary" onClick={onAddEntry}>
            Create Your First Entry
          </button>
        </div>
      ) : (
        <div className="feed-grid">
          {filteredEntries.map((entry) => (
            <TripCard
              key={entry._id}
              trip={entry}
              onView={() => onViewEntry(entry._id)}
            />
          ))}
        </div>
      )}

      <button
        className="fab-button"
        onClick={onAddEntry}
        title="Add new entry"
      >
        +
      </button>
    </div>
  );
}

export default JournalFeed;
