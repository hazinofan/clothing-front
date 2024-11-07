import React from 'react';
import '../css/topseller.css'; // Your existing styling remains untouched
import { useNavigate } from 'react-router-dom';

const TopSeller = () => {
  const navigate = useNavigate();

  const handleClick = (endTitle) => {
    // Apply fade-out animation by adding a class
    document.querySelector('.container-image').classList.add('fade-out');
    
    // Navigate to TitleAnimation component with a delay to allow the animation to finish
    setTimeout(() => {
      navigate('/project-product', {
        state: { StartTitle: 'MASATO RIESSER', midTitle: 'for', endTitle }
      });
    }, 500); // Adjust delay to match fade-out duration
  };

  return (
    <div className="container-image">
      
      
      <div className="product-section">
        {/* Left Side - Street Image */}
        <div className="left-section cursor-pointer"  onClick={() => handleClick('T-shirts')}>
          <img src='/assets/coll1.jpeg' alt="Group of people wearing the brand's clothing" className="street-image" />
          <div className="product-info">
            <h2>Feeling T-Shirt</h2>
            <p>970.00 EUR</p>
          </div>
        </div>
        
        {/* Right Side - Product Shots */}
        <div className="right-section">
          <div className="product-image-container cursor-pointer" onClick={() => handleClick('FALL SEASON')}>
            <img src='/assets/coll2.jpeg' alt="Product front view" className="product-image" />
            <p>FALL EXTRA SEASON</p>
          </div>
          <div className="product-image-container cursor-pointer" onClick={() => handleClick('Baggy T-shirts')}>
            <img src='/assets/coll3.jpg' alt="Product side view" className="product-image" />
            <p>RETRO BAGGY T-SHIRTS</p>
          </div>
          <div className="product-image-container deleted-responsive cursor-pointer" onClick={() => handleClick('Jerseys')}>
            <img src='/assets/coll4.jpg' alt="Product back view" className="product-image" />
            <p>MID SEASON VINTAGE JERSEY'S</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSeller;
