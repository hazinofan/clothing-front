import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../css/titleanimation.css';
import { useLocation } from 'react-router-dom';
import detailsRight from '../assets/details.jpg';
import details1 from '../assets/details2.jpg';
import details2 from '../assets/details3.jpg';
import details3 from '../assets/details4.jpg';
import { FaHeart, FaStar } from 'react-icons/fa6';

export default function TitleAnimation() {
  const [showContent, setShowContent] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const location = useLocation();
  const StartTitle = location.state?.StartTitle || "Default Title";
  const midTitle = location.state?.midTitle || "Default Mid Title";
  const endTitle = location.state?.endTitle || "Default End Title";

  const [selectedColor, setSelectedColor] = useState(125);

  const colors = [
    { id: 125, name: 'Rose Flambé', hex: '#B32D3B' },
    { id: 126, name: 'Brun Chocolat', hex: '#70413E' },
    { id: 127, name: 'Violet Sombre', hex: '#8D4A63' },
    { id: 128, name: 'Nude Classique', hex: '#AE7D6E' },
    { id: 129, name: 'Rouge Passion', hex: '#BA3A4E' },
    { id: 130, name: 'Marron Foncé', hex: '#5B3C39' },
    { id: 131, name: 'Violet Intense', hex: '#943D56' },
    { id: 132, name: 'Rose Vif', hex: '#B3143E' },
  ];

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
    <div data-aos="fade-in" className="min-h-screen text-gray-800 pt-16"> {/* Added pt-16 for padding at the top */}
      {showContent ? (
        <div data-aos="fade-in" className={`animation_div ${fadeOut ? 'fade-out' : ''}`}>
        <h1 className='animation_title'>
              {StartTitle} <span className=' mid-header'> {midTitle} </span> {endTitle}
          </h1>
        <div className="animation_footer">
          <p> JEWELRY & MAKEUP </p>
          <p> AOS </p>
          <p> CLOSE </p>
        </div>
      </div>
      ) : (
        <div data-aos="fade-in" className="container mx-auto flex flex-col md:flex-row gap-10 py-16 px-4 md:px-8 items-start">
          {/* Left Column */}
          <div className="flex md:flex-row gap-2 w-full md:w-2/3">
            {/* Main Image */}
            <div className="relative">
              <img
                src={detailsRight}
                alt="Lipstick Image Ad"
                className=" shadow-lg w-full h-full object-cover"
              />
            </div>
            {/* Small Images on the Right */}
            <div className="grid grid-rows-3 gap-4 h-full">
              <img src={details1} alt="Lipstick product details" className=" shadow-md object-cover h-full" style={{width: '473px'}}/>
              <img src={details2} alt="Lipstick product details" className=" shadow-md object-cover h-full" style={{width: '473px'}}/>
              <img src={details3} alt="Lipstick product details" className=" shadow-md object-cover h-full" style={{width: '473px'}}/>
            </div>
          </div>
          {/* Right Column for Description */}
          <div className="w-full md:w-1/3 mt-8 md:mt-0">
            <p className="text-gray-600 leading-relaxed">
            <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
          {/* Badge */}
            <span className="inline-block bg-black text-white px-3 py-1 text-xs font-bold rounded-full mb-2">
                Nouveauté
            </span>

            {/* Product Title */}
            <h2 className="text-sm font-bold uppercase text-gray-700">SEPHORA COLLECTION</h2>
            <h1 className="text-xl font-bold text-gray-800 mt-1">
                Cream Lip Stain - Rouge Velouté Sans Transfert - Rouge À Lèvres Liquide Mat
            </h1>

            {/* Rating and Reviews */}
            <div className="flex items-center mt-2">
                <div className="flex space-x-1 text-yellow-500">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar className="text-gray-300" />
                </div>
                <a href="#" className="ml-2 text-sm text-gray-600">(214 avis)</a>
                <FaHeart className="ml-auto text-gray-500 cursor-pointer hover:text-black" />
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-600 text-sm">
                SAME BUT DIFFERENT(1) : le rouge à lèvres liquide iconique CREAM LIP STAIN(2) se réinvente ! ...
                <a href="#" className="text-gray-700 font-bold ml-1">En savoir plus</a>
            </p>

            <div className="flex items-center mt-2 p-3 border border-gray-200 rounded-md">
                <span className="text-gray-700 font-medium">
                {selectedColor} {colors.find(color => color.id === selectedColor)?.name} (5 ml)
                </span>
            </div>

            {/* Color Swatches */}
            <div className="flex space-x-2 mt-4">
                {colors.map(color => (
                <button
                    key={color.id}
                    className={`w-8 h-8 rounded-full border-2 ${selectedColor === color.id ? 'border-gray-900' : 'border-transparent'}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.id)}
                />
                ))}
            </div>

            {/* Add to Cart Button */}
            <button className="w-full mt-6 py-3 text-white font-semibold bg-black rounded-lg hover:bg-gray-800">
                Go to Details Page
            </button>
            </div>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
