import landing1 from '../assets/preview1.webp';
import preview2 from '../assets/preview2.webp';
import preview3 from '../assets/preview3.webp';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../css/titleanimation.css';
import { useLocation } from 'react-router-dom';

export default function ProductAnimation() {
  const [showContent, setShowContent] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const location = useLocation();
  const endTitle = location.state?.endTitle || "PRODUCT HEADER";

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out' });
    const fadeOutTimer = setTimeout(() => setFadeOut(true), 3000);
    const hideContentTimer = setTimeout(() => setShowContent(false), 4000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(hideContentTimer);
    };
  }, []);

  

  return (
    <div className="pt-28 pb-32" data-aos="fade-in">
      {showContent ? (
        <div className={`animation_div ${fadeOut ? 'fade-out' : ''}`}>
          <h1 className="animation_title">
            DISCOVER NEW ARRIVALS <span className="mid-header"> for </span> {endTitle}
          </h1>
          <div className="animation_footer">
            <p>JEWELRY & MAKEUP</p>
            <p>AOS</p>
            <p>CLOSE</p>
          </div>
        </div>
      ) : (
        <div className="flex gap-52 h-auto px-10" data-aos="fade-in">
          {/* Left div */}
          <div className="flex flex-col gap-32 pt-16" data-aos="fade-in" >
            <div className="image_header">
              <p>LIFE DESERVES MORE <br /> ACTION</p>
              <button
                type="submit"
                className="flex justify-center gap-2 items-center border-2 border-black w-52 mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:bg-black hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-1 overflow-hidden border-2 group"
                style={{ fontFamily: "GT Flexa Trial Cm Md", letterSpacing: '2px' }}
              >
                LEARN MORE
              </button>
            </div>
            <div data-aos="fade-in">
              <img src={landing1} alt="" />
              <button
                type="submit"
                className="flex justify-start mt-7 gap-2 items-center border-2 border-black w-full mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:bg-black hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-1 overflow-hidden border-2 group"
                style={{ fontFamily: "GT Flexa Trial Cm Md", letterSpacing: '2px' }}
              >
                EXPLORE MORE T-SHIRTS
              </button>
            </div>
          </div>
          {/* Mid div */}
          <div data-aos="fade-in" data-aos-delay="500">
            <img src={preview2} alt="" className="product_preview" />
            <button
              type="submit"
              className="flex justify-start mt-7 gap-2 items-center border-2 border-black w-full mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:bg-black hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-1 overflow-hidden border-2 group"
              style={{ fontFamily: "GT Flexa Trial Cm Md", letterSpacing: '2px' }}
            >
              EXPLORE MORE HOODIES
            </button>
          </div>
          {/* Right div */}
          <div data-aos="fade-in" data-aos-delay="1000" style={{ alignSelf: 'end' }}>
            <img src={preview3} alt="" className="product_preview" />
            <button
              type="submit"
              className="flex justify-start mt-7 gap-2 items-center border-2 border-black w-full mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:bg-black hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-1 overflow-hidden border-2 group"
              style={{ fontFamily: "GT Flexa Trial Cm Md", letterSpacing: '2px' }}
            >
              EXPLORE MORE BOTTOMS
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
