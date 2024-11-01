import React from 'react';
import '../css/LandingPage.css'; // Make sure to create a CSS file for the styling
import karina from '../assets/karina.jpg'
import video from '../assets/video.mp4'
import ProductSwiper from '../pages components/HeroSwipper';

const HeroSection = () => {
  return (
    <>
    <div className="hero-section">
      {/* Background Video or Image */}
      <div className="hero-background">
        <video autoPlay loop muted className="hero-video">
          <source src={video} type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <img src={karina}  alt="Background" />
        </video>
      </div>

      {/* Overlay Content */}
      <div className="hero-content">
        <div className="">
          <h1> Y2K NEW COLLECTIONS</h1>
        </div>

        <div className="hero-main">
          <div className="hero-title">  
            <h1> Choose Your Style</h1>
          </div>
          <button className="hero-button">Discover Now</button>
        </div>

      </div>
    </div>
    <div className="hero-footer">
          <p>SECOND GENERATION<br />ITAEWON-RO 234 3RD FL YONGSAN-GU | ATALANTA <br />USA04400 IISE.COM</p>
        </div>

        <ProductSwiper />
    </>
  );
};

export default HeroSection;
