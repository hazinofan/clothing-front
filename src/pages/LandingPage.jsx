import React from 'react';
import '../css/LandingPage.css'; // Make sure to create a CSS file for the styling
import karina from '../assets/karina.jpg'
import video from '../assets/video.mp4'
import ProductSwiper from '../pages components/HeroSwipper';
import Collections from '../pages components/Collections';
import TopSeller from '../pages components/TopSeller';
import ImageComponent from '../pages components/ImageComponent';
import { ArrowRightAltOutlined, Height } from '@mui/icons-material';

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
          <button
                type="submit"
                className="flex justify-center gap-2 items-center justify-between border-black w-72 shadow-xl text-lg bg-gray-50 backdrop-blur-md isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:bg-black hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-1 overflow-hidden border-2 group text-black"
                style={{ fontFamily: "GT Flexa Trial Cm Md", letterSpacing: '2px', height : '45px' }} 
              >
                LEARN MORE
                <ArrowRightAltOutlined className=' text-3xl' />
              </button>
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
