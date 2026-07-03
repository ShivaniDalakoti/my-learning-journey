import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setMessage(data.status);
        setLoading(false);
      })
      .catch(() => {
        setMessage('Failed to connect to backend');
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Travel Journal</h1>
        <p>Document your adventures</p>
      </header>
      <main>
        <div className="status">
          {loading ? <p>Loading...</p> : <p>{message}</p>}
        </div>
        <section className="features">
          <h2>Features Coming Soon</h2>
          <ul>
            <li>📝 Create travel journal entries</li>
            <li>📸 Add photos to your trips</li>
            <li>📍 Mark locations on a map</li>
            <li>📅 Track travel dates</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
