import React from 'react';
import './Loader.css';

const Loader: React.FC = () => (
  <div className="loader-container">
    <div className="space-loader">
      {/* Animated stars */}
      {[...Array(30)].map((_, i) => (
        <div key={i} className="star" style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random()}s`
        }} />
      ))}
      {/* Planet */}
      <div className="planet">
        <div className="ring"></div>
      </div>
      <span className="space-text">Preparing for cosmic journey...</span>
    </div>
  </div>
);

export default Loader;
