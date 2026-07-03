import React, { useEffect, useRef } from 'react';
import './MapView.css';

function MapView({ entries, onMarkerClick, center, zoom }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map with default center and zoom
    const defaultCenter = center || { lat: 20, lng: 0 };
    const defaultZoom = zoom || 2;

    // Create a simple map container with markers
    renderMap(defaultCenter, defaultZoom);
  }, [center, zoom, entries]);

  const renderMap = (centerCoords, zoomLevel) => {
    const mapContainer = mapRef.current;
    if (!mapContainer) return;

    // Clear previous markers
    mapContainer.innerHTML = '';
    markersRef.current = [];

    // Create map canvas
    const canvas = document.createElement('div');
    canvas.className = 'map-canvas';
    mapContainer.appendChild(canvas);

    // Create SVG overlay for markers
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 800 600');
    svg.className = 'map-markers';
    canvas.appendChild(svg);

    // Add placeholder map background
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', '800');
    rect.setAttribute('height', '600');
    rect.setAttribute('fill', '#e0e7ff');
    svg.appendChild(rect);

    // Add markers for entries with coordinates
    entries.forEach((entry) => {
      if (entry.coordinates?.latitude && entry.coordinates?.longitude) {
        // Simple projection for demo
        const x = ((entry.coordinates.longitude + 180) / 360) * 800;
        const y = ((entry.coordinates.latitude + 90) / 180) * 600;

        // Create marker group
        const markerGroup = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'g'
        );
        markerGroup.setAttribute('class', 'marker');
        markerGroup.style.cursor = 'pointer';

        // Create marker circle
        const circle = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'circle'
        );
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', '8');
        circle.setAttribute('fill', '#667eea');
        circle.setAttribute('stroke', 'white');
        circle.setAttribute('stroke-width', '2');

        // Create marker label
        const text = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'text'
        );
        text.setAttribute('x', x);
        text.setAttribute('y', y - 15);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('class', 'marker-label');
        text.setAttribute('fill', '#667eea');
        text.textContent = entry.title;

        markerGroup.appendChild(circle);
        markerGroup.appendChild(text);

        markerGroup.addEventListener('click', () => {
          if (onMarkerClick) {
            onMarkerClick(entry._id);
          }
        });

        svg.appendChild(markerGroup);
        markersRef.current.push(markerGroup);
      }
    });

    // Add center marker
    const centerX = (centerCoords.lng + 180 / 360) * 800;
    const centerY = (centerCoords.lat + 90 / 180) * 600;

    const centerMarker = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    centerMarker.setAttribute('cx', centerX);
    centerMarker.setAttribute('cy', centerY);
    centerMarker.setAttribute('r', '6');
    centerMarker.setAttribute('fill', '#764ba2');
    centerMarker.setAttribute('opacity', '0.5');
    svg.appendChild(centerMarker);
  };

  return (
    <div className="map-view">
      <div className="map-header">
        <h2>Travel Locations Map</h2>
        <p>View all your trip destinations</p>
      </div>
      <div className="map-container" ref={mapRef}>
        <p className="map-placeholder">Loading map...</p>
      </div>
      {entries.length === 0 && (
        <div className="map-empty">
          <p>Add trips with coordinates to see them on the map!</p>
        </div>
      )}
    </div>
  );
}

export default MapView;
