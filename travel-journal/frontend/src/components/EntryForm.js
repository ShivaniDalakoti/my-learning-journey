import React, { useState, useEffect } from 'react';
import './EntryForm.css';

function EntryForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    location: '',
    latitude: '',
    longitude: '',
    description: '',
    rating: 5,
    mood: 'good',
    tags: '',
    photos: [],
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        tags: initialData.tags?.join(', ') || '',
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const submitData = {
        ...formData,
        tags: formData.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      };

      await onSubmit(submitData);
    } catch (error) {
      setErrors({
        submit: error.message || 'Failed to save entry',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="entry-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>New Travel Entry</h2>
        <button
          type="button"
          className="btn-close"
          onClick={onCancel}
          title="Close"
        >
          ✕
        </button>
      </div>

      {errors.submit && (
        <div className="error-message">{errors.submit}</div>
      )}

      <div className="form-group">
        <label htmlFor="title">
          Trip Title <span className="required">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="e.g., Bali Adventure"
          className={errors.title ? 'input-error' : ''}
        />
        {errors.title && (
          <span className="field-error">{errors.title}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="startDate">
            Start Date <span className="required">*</span>
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className={errors.startDate ? 'input-error' : ''}
          />
          {errors.startDate && (
            <span className="field-error">{errors.startDate}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="endDate">
            End Date <span className="required">*</span>
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            className={errors.endDate ? 'input-error' : ''}
          />
          {errors.endDate && (
            <span className="field-error">{errors.endDate}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="location">
          Location <span className="required">*</span>
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="e.g., Bali, Indonesia"
          className={errors.location ? 'input-error' : ''}
        />
        {errors.location && (
          <span className="field-error">{errors.location}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleInputChange}
            placeholder="e.g., -8.6500"
            step="0.0001"
          />
        </div>

        <div className="form-group">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleInputChange}
            placeholder="e.g., 115.2167"
            step="0.0001"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Tell us about your trip..."
          rows="6"
        />
      </div>

      <div className="form-group">
        <label>Rating</label>
        <div className="rating-selector">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${formData.rating >= star ? 'active' : ''}`}
              onClick={() =>
                setFormData({ ...formData, rating: star })
              }
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Mood</label>
        <div className="mood-selector">
          {['amazing', 'good', 'okay', 'bad'].map((mood) => (
            <button
              key={mood}
              type="button"
              className={`mood-btn ${
                formData.mood === mood ? 'active' : ''
              }`}
              onClick={() =>
                setFormData({ ...formData, mood })
              }
            >
              {mood.charAt(0).toUpperCase() + mood.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
          placeholder="e.g., Beach, Adventure, Food (comma-separated)"
        />
        {formData.tags && (
          <div className="tag-chips">
            {formData.tags
              .split(',')
              .map((tag) => tag.trim())
              .filter((tag) => tag)
              .map((tag, index) => (
                <span key={index} className="tag-chip">
                  {tag}
                </span>
              ))}
          </div>
        )}
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
        >
          {submitting ? 'Saving...' : 'Save Entry'}
        </button>
      </div>
    </form>
  );
}

export default EntryForm;
