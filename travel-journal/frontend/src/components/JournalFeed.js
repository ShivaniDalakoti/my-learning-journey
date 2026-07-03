import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import TripCard from './TripCard';
import SearchFilters from './SearchFilters';
import './JournalFeed.css';

function JournalFeed({ onAddEntry, onViewEntry }) {
  const { token } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minRating: 0,
    moods: [],
    tags: [],
    location: '',
    startDate: '',
    endDate: '',
    sortBy: 'recent',
  });

  useEffect(() => {
    fetchEntries();
  }, [token]);

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/entries', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setEntries(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch entries:', error);
      setLoading(false);
    }
  };

  const getUniquLocations = () => {
    const locations = new Set(entries.map((e) => e.location));
    return Array.from(locations).sort();
  };

  const getAllTags = () => {
    const allTags = new Set();
    entries.forEach((entry) => {
      (entry.tags || []).forEach((tag) => allTags.add(tag));
    });
    return Array.from(allTags).sort();
  };

  const applyFilters = (entries) => {
    let filtered = entries.filter((entry) => {
      // Search by title or location
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        entry.title.toLowerCase().includes(searchLower) ||
        entry.location.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;

      // Filter by rating
      if (filters.minRating > 0 && entry.rating < filters.minRating) {
        return false;
      }

      // Filter by mood
      if (filters.moods.length > 0 && !filters.moods.includes(entry.mood)) {
        return false;
      }

      // Filter by location
      if (
        filters.location &&
        !entry.location
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      // Filter by date range
      const entryStart = new Date(entry.startDate);
      if (
        filters.startDate &&
        entryStart < new Date(filters.startDate)
      ) {
        return false;
      }

      const entryEnd = new Date(entry.endDate);
      if (filters.endDate && entryEnd > new Date(filters.endDate)) {
        return false;
      }

      // Filter by tags
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some((tag) =>
          (entry.tags || []).includes(tag)
        );
        if (!hasMatchingTag) return false;
      }

      return true;
    });

    // Sort
    switch (filters.sortBy) {
      case 'oldest':
        filtered.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );
        break;
      case 'rating-high':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-low':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'recent':
      default:
        filtered.sort(
          (a, b) => new Date(b.startDate) - new Date(a.startDate)
        );
    }

    return filtered;
  };

  const filteredEntries = applyFilters(entries);

  return (
    <div className="journal-feed">
      <div className="feed-header">
        <h1>Travel Journal</h1>
        <p>Capture your adventures</p>
      </div>

      <SearchFilters
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        filters={filters}
        onFilterChange={setFilters}
        locations={getUniquLocations()}
        tags={getAllTags()}
      />

      {loading ? (
        <div className="loading">Loading your trips...</div>
      ) : entries.length === 0 ? (
        <div className="empty-state">
          <p>No trips yet! Start documenting your adventures.</p>
          <button className="btn btn-primary" onClick={onAddEntry}>
            Create Your First Entry
          </button>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="empty-state">
          <p>No trips match your filters.</p>
          <button
            className="btn btn-secondary"
            onClick={() =>
              setFilters({
                minRating: 0,
                moods: [],
                tags: [],
                location: '',
                startDate: '',
                endDate: '',
                sortBy: 'recent',
              })
            }
          >
            Clear Filters
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
