import React from 'react';
import '../css/topseller.css'; // Create this CSS file

// Import your images here
import coll1 from '../assets/coll1.jpeg';
import coll2 from '../assets/coll2.jpeg';
import coll3 from '../assets/coll3.jpg';
import coll4 from '../assets/coll4.jpg';

const TopSeller = () => {
  return (
    <>
    <div className="product-info">
          <h2>Feeling T-Shirt</h2>
          <p>970.00 EUR</p>
        </div>
    <div className="product-section">
      {/* Left Side - Street Image */}
      <div className="left-section">
        <img src={coll4} alt="Group of people wearing the brand's clothing" className="street-image" />
      </div>
      {/* Right Side - Product Shots */}
      <div className="right-section">
        <div className="product-image-container">
          <img src={coll1} alt="Product front view" className="product-image" />
          <p> FALL EXTRA SEASON </p>
        </div>
        <div className="product-image-container">
          <img src={coll2} alt="Product side view" className="product-image" />
          <p> RETRO BAGGY T-SHIRTS </p>
        </div>
        <div className="product-image-container">
          <img src={coll3} alt="Product back view" className="product-image" />
          <p> MID SEASON VINTAGE JERSEY'S </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default TopSeller;
