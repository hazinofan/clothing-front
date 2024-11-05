import React from 'react';
import '../css/topseller.css'; // Your existing styling remains untouched

import coll1 from '../assets/coll1.jpeg';
import coll2 from '../assets/coll2.jpeg';
import coll3 from '../assets/coll3.jpg';
import coll4 from '../assets/coll4.jpg';
import croptop1 from '../assets/croptop1.jpg';
import croptop2 from '../assets/croptop2.jpg';
import { useNavigate } from 'react-router-dom';

const TopSeller = () => {
  const navigate = useNavigate();

  const handleClick = (endTitle) => {
    // Apply fade-out animation by adding a class
    const handleClick = (endTitle, images, buttonText, links) => {
      document.querySelector('.container-image').classList.add('fade-out');
    
      setTimeout(() => {
        navigate('/project-product', {
          state: { 
            StartTitle: 'MASATO RIESSER', 
            midTitle: 'for', 
            endTitle, 
            images, 
            buttonText, 
            links 
          }
        });
      }, 500);
    }; // Adjust delay to match fade-out duration
  };

  return (
    <div className="container-image">
      
      
      <div className="product-section">
        {/* Left Side - Street Image */}
        <div className="left-section cursor-pointer"  onClick={() => handleClick('T-shirts' , 
          [croptop1, croptop2],
          ['Explore Crop-Tops', 'Explore Cheeries T-Shirts', 'Explore New Gen T-shirts'],
          ['/tshirts', '/hoodies', '/bottoms']
        )}>
          <img src={coll4} alt="Group of people wearing the brand's clothing" className="street-image" />
          <div className="product-info">
            <h2>Feeling T-Shirt</h2>
            <p>970.00 EUR</p>
          </div>
        </div>
        
        {/* Right Side - Product Shots */}
        <div className="right-section">
          <div className="product-image-container cursor-pointer" onClick={() => handleClick('FALL SEASON')}>
            <img src={coll1} alt="Product front view" className="product-image" />
            <p>FALL EXTRA SEASON</p>
          </div>
          <div className="product-image-container cursor-pointer" onClick={() => handleClick('Baggy T-shirts')}>
            <img src={coll2} alt="Product side view" className="product-image" />
            <p>RETRO BAGGY T-SHIRTS</p>
          </div>
          <div className="product-image-container deleted-responsive cursor-pointer" onClick={() => handleClick('Jerseys')}>
            <img src={coll3} alt="Product back view" className="product-image" />
            <p>MID SEASON VINTAGE JERSEY'S</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSeller;
