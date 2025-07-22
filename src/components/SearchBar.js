import React, { useState } from 'react';

function SearchBar({ value, onChange, onSearch, suggestions = [] }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const filtered = suggestions.filter((s) =>
    s.toLowerCase().startsWith(value.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filtered.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filtered.length - 1
      );
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && filtered[highlightedIndex]) {
        const selected = filtered[highlightedIndex];
        onChange({ target: { value: selected } });
        onSearch();
        setShowSuggestions(false);
      } else {
        onSearch();
        setShowSuggestions(false);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleClickSuggestion = (suggestion) => {
    onChange({ target: { value: suggestion } });
    onSearch();
    setShowSuggestions(false);
  };

  return (
    <div style={{ position: 'relative', maxWidth: '400px', margin: 'auto' }}>
      <div style={{ display: 'flex' }}>
        <input
          type="text"
          placeholder="Enter city"
          value={value}
          onChange={(e) => {
            onChange(e);
            setShowSuggestions(true);
            setHighlightedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <button
          onClick={() => {
            onSearch();
            setShowSuggestions(false);
          }}
          className="search-button"
        >
          Search
        </button>
      </div>

      {showSuggestions && filtered.length > 0 && (
        <ul className="suggestions-dropdown">
          {filtered.map((city, idx) => (
            <li
              key={idx}
              onClick={() => handleClickSuggestion(city)}
              className={highlightedIndex === idx ? 'highlighted' : ''}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
