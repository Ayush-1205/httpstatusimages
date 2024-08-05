// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [image, setImage] = useState(null); // Store the single image URL
  const [search, setSearch] = useState(''); // Track the search input
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Store error messages
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category

  // List of tags categorized by status code range
  const statusCategories = {
    '1xx': [100, 101, 102, 103],
    '2xx': [200, 201, 202, 203, 204, 205, 206, 207, 208, 218, 226],
    '3xx': [300, 301, 302, 303, 304, 305, 306, 307, 308],
    '4xx': [400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 451, 460, 463, 464, 494, 495, 496, 497, 498, 499],
    '5xx': [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 561, 598, 599],
    '9xx': [999]
  };

  const handleSearch = async (tag) => {
    setLoading(true);
    setError(null);
    try {
      // Construct the image URL based on search input
      const url = `https://http.dog/${tag}.jpg`;
      const response = await axios.get(url);
      setImage(url); // Set the image URL if successful
      setSearch(tag); // Update search input to the selected tag
    } catch (error) {
      setError('Image not found or error fetching image.');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Dog Image Search</h1>
        <p className="description">Get a photo of a dog based on HTTP status code</p>
      </div>
      <input
        type="text"
        placeholder="Enter status code (e.g., 100)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <button onClick={() => handleSearch(search)} className="search-button">
        Search
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {image && !loading && !error && (
        <div className="image-section">
          <img src={image} alt={`Dog ${search}`} className="image" />
        </div>
      )}
      <div className="categories-section">
        <h2>Select a Category:</h2>
        <ul className="categories-list">
          {Object.keys(statusCategories).map(category => (
            <li key={category} className="category-item">
              <button
                onClick={() => setSelectedCategory(category)}
                className="category-button"
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedCategory && (
        <div className="tags-section">
          <h2>Available Tags for {selectedCategory}:</h2>
          <ul className="tags-list">
            {statusCategories[selectedCategory].map(tag => (
              <li key={tag} className="tag-item">
                <button onClick={() => handleSearch(tag)} className="tag-button">
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
