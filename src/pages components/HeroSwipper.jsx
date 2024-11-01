import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import image1 from '../assets/image1.webp'
import image2 from '../assets/image2.webp'
import image3 from '../assets/image3.webp'
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

const ProductSwiper = () => {
  const [page, setPage] = useState(1);

  const productsPage1 = [
    { name: 'HIGH SCULPT BRA RIB', price: '506 DH', img: 'path/to/image1.jpg' },
    { name: 'LOW HIDE BRIEF', price: '304 DH', img: 'path/to/image2.jpg' },
    { name: 'HIGH SCULPT THONG RIB', price: '304 DH', img: 'path/to/image3.jpg' },
  ];

  const productsPage2 = [
    { name: 'PRODUCT 4', price: '600 DH', img: 'path/to/image4.jpg' },
    { name: 'PRODUCT 5', price: '800 DH', img: 'path/to/image5.jpg' },
    { name: 'PRODUCT 6', price: '700 DH', img: 'path/to/image6.jpg' },
  ];

  const handleNextPage = () => setPage(page === 1 ? 2 : 1);

  return (
    <div className="page-container">
    <div className="image-container">
        <img src={image1} alt="" className="image-fit" />
        <button className="btn">
            <span className="button-text">
            Men's Section <span className="long-arrow"><LiaLongArrowAltRightSolid /></span>
            </span>
        </button>
    </div>
    <div className="image-container">
        <img src={image2} alt="" className="image-fit" />
        <button className="btn">
            <span className="button-text">
            Women's Section <span className="long-arrow"><LiaLongArrowAltRightSolid /></span>
            </span>
        </button>
    </div>
    <div className="image-container">
        <img src={image3} alt="" className="image-fit" />
        <button className="btn">
            <span className="button-text">
            High Sculpt Brief <span className="long-arrow"><LiaLongArrowAltRightSolid /></span>
            </span>
        </button>
    </div>
</div>



  );
};

export default ProductSwiper;
