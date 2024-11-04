import React from 'react';
import '../css/LandingPage.css'; // Make sure to create a CSS file for the styling
import karina from '../assets/karina.jpg'
import video from '../assets/video.mp4'
import ProductSwiper from '../pages components/HeroSwipper';
import Collections from '../pages components/Collections';
import TopSeller from '../pages components/TopSeller';
import ImageComponent from '../pages components/ImageComponent';

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
        </div>

      </div>
    </div>
    <div className="hero-footer">
          <p>SECOND GENERATION<br />ITAEWON-RO 234 3RD FL YONGSAN-GU | ATALANTA <br />USA04400 IISE.COM</p>
          <button className="hero-button">Discover Now</button>
        </div>

        <ProductSwiper />
        <Collections />

        <h1 className="text-4xl font-bold text-center text-gray-800 my-6 relative">
          <span className="relative inline-block">TOP SELLER</span>
          <span className="absolute inset-0 bg-gradient-to-r from-white to-blue-500 via-blue-300 to-white opacity-30 rounded-lg"></span>
        </h1>

        <TopSeller />
        <ImageComponent />
    </>
  );
};

export default HeroSection;
