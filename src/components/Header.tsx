import { useState } from 'react';
import { FiClock, FiMoon, FiSun } from 'react-icons/fi';
import './Header.css';

interface HeaderProps {
  onHome: () => void;
}

export function Header({ onHome }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a future implementation, this could toggle a dark mode class on the body
    // or change CSS variables for a dark theme
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="app-title" onClick={onHome}>
            <FiClock className="icon" />
            后来
          </h1>
          <p className="app-subtitle">记录当下，留给后来</p>
        </div>

        <div className="header-right">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </div>
    </header>
  );
}
