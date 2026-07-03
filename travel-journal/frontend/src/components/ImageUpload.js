import React, { useRef, useState } from 'react';
import './ImageUpload.css';

function ImageUpload({ onPhotosChange, initialPhotos = [] }) {
  const fileInputRef = useRef(null);
  const [photos, setPhotos] = useState(initialPhotos);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = async (files) => {
    if (!files || files.length === 0) return;

    const newPhotos = [];

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed');
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        continue;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = async (e) => {
        const preview = e.target.result;

        // Upload file
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Upload failed');
          }

          const data = await response.json();

          const newPhoto = {
            url: data.url,
            caption: '',
            preview,
          };

          setPhotos((prev) => [...prev, newPhoto]);
          onPhotosChange([...photos, newPhoto]);
          setError('');
        } catch (err) {
          setError('Failed to upload image. Please try again.');
          console.error('Upload error:', err);
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    handleFileSelect(files);
  };

  const handleRemovePhoto = (index) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    onPhotosChange(updatedPhotos);
  };

  const handleCaptionChange = (index, caption) => {
    const updatedPhotos = photos.map((photo, i) =>
      i === index ? { ...photo, caption } : photo
    );
    setPhotos(updatedPhotos);
    onPhotosChange(updatedPhotos);
  };

  return (
    <div className="image-upload">
      <label>Photos</label>

      <div
        className="upload-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          disabled={uploading}
          style={{ display: 'none' }}
        />

        <div className="upload-content">
          <div className="upload-icon">📸</div>
          <p className="upload-text">
            {uploading ? 'Uploading...' : 'Drag photos here or click to select'}
          </p>
          <p className="upload-hint">
            Max 5MB per image, up to 10 images
          </p>
        </div>
      </div>

      {error && <div className="upload-error">{error}</div>}

      {photos.length > 0 && (
        <div className="photo-gallery">
          <h4>{photos.length} photo(s) selected</h4>
          <div className="photo-grid">
            {photos.map((photo, index) => (
              <div key={index} className="photo-item">
                <div className="photo-preview">
                  <img
                    src={photo.preview || photo.url}
                    alt={`Photo ${index + 1}`}
                  />
                  <button
                    type="button"
                    className="photo-remove"
                    onClick={() => handleRemovePhoto(index)}
                    disabled={uploading}
                  >
                    ✕
                  </button>
                </div>
                <input
                  type="text"
                  className="photo-caption"
                  placeholder="Add caption..."
                  value={photo.caption || ''}
                  onChange={(e) =>
                    handleCaptionChange(index, e.target.value)
                  }
                  disabled={uploading}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
