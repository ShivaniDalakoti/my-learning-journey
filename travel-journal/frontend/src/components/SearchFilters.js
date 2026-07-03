import React, { useState } from 'react';
import './SearchFilters.css';

function SearchFilters({
  onSearch,
  onFilterChange,
  searchTerm,
  filters,
  locations,
  tags,
}) {
  const [showFilters, setShowFilters] = useState(false);

  const handleRatingChange = (rating) => {
    onFilterChange({
      ...filters,
      minRating: filters.minRating === rating ? 0 : rating,
    });
  };

  const handleMoodToggle = (mood) => {
    const moods = filters.moods || [];
    const newMoods = moods.includes(mood)
      ? moods.filter((m) => m !== mood)
      : [...moods, mood];
    onFilterChange({ ...filters, moods: newMoods });
  };

  const handleTagToggle = (tag) => {
    const selectedTags = filters.tags || [];
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    onFilterChange({ ...filters, tags: newTags });
  };

  const handleLocationChange = (location) => {
    onFilterChange({ ...filters, location });
  };

  const handleDateRangeChange = (type, value) => {
    onFilterChange({
      ...filters,
      [type]: value,
    });
  };

  const clearFilters = () => {
    onFilterChange({
      minRating: 0,
      moods: [],
      tags: [],
      location: '',
      startDate: '',
      endDate: '',
      sortBy: 'recent',
    });
  };

  const hasActiveFilters =
    filters.minRating > 0 ||
    (filters.moods && filters.moods.length > 0) ||
    (filters.tags && filters.tags.length > 0) ||
    filters.location ||
    filters.startDate ||
    filters.endDate;

  return (
    <div className="search-filters">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search by title or location..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
        <button
          className={`filter-toggle ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
          title="Toggle filters"
        >
          ⚙️ Filters {hasActiveFilters && '•'}
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filters-header">
            <h3>Filters</h3>
            {hasActiveFilters && (
              <button className="clear-filters" onClick={clearFilters}>
                Clear All
              </button>
            )}
          </div>

          <div className="filter-group">
            <label>Minimum Rating</label>
            <div className="rating-filter">
              {[0, 1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  className={`rating-btn ${
                    filters.minRating === rating ? 'active' : ''
                  }`}
                  onClick={() => handleRatingChange(rating)}
                >
                  {rating === 0 ? 'Any' : '★'.repeat(rating)}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Mood</label>
            <div className="mood-filter">
              {['amazing', 'good', 'okay', 'bad'].map((mood) => (
                <button
                  key={mood}
                  className={`mood-filter-btn ${
                    (filters.moods || []).includes(mood) ? 'active' : ''
                  }`}
                  onClick={() => handleMoodToggle(mood)}
                >
                  {mood.charAt(0).toUpperCase() + mood.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Location</label>
            <select
              value={filters.location || ''}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="location-select"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Date Range</label>
            <div className="date-range">
              <input
                type="date"
                value={filters.startDate || ''}
                onChange={(e) =>
                  handleDateRangeChange('startDate', e.target.value)
                }
                placeholder="From"
              />
              <input
                type="date"
                value={filters.endDate || ''}
                onChange={(e) =>
                  handleDateRangeChange('endDate', e.target.value)
                }
                placeholder="To"
              />
            </div>
          </div>

          {tags.length > 0 && (
            <div className="filter-group">
              <label>Tags</label>
              <div className="tags-filter">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    className={`tag-filter-btn ${
                      (filters.tags || []).includes(tag) ? 'active' : ''
                    }`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="filter-group">
            <label>Sort By</label>
            <select
              value={filters.sortBy || 'recent'}
              onChange={(e) =>
                onFilterChange({ ...filters, sortBy: e.target.value })
              }
              className="sort-select"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="rating-high">Highest Rating</option>
              <option value="rating-low">Lowest Rating</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchFilters;
