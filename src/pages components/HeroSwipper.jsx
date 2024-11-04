import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import image1 from '../assets/image1.webp';
import image2 from '../assets/image2.webp';
import image3 from '../assets/image3.webp';
import men from '../assets/men.jpg';
import kids from '../assets/kids.jpg';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';
import '../css/responsive.css';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';

const ProductSwiper = () => {
  useEffect(() => {
    const navigationButtons = document.querySelectorAll('.custom-arrow');
    if (navigationButtons.length) {
      navigationButtons.forEach(button => {
        button.classList.add('swiper-navigation-enabled'); // Ensures Swiper recognizes them as navigation buttons
      });
    }
  }, []);

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span className="' + className + '">' + (index + 1) + '</span>';
    },
  };

  return (
    <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={pagination}
        navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
        }}
        loop
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <div className="page-container">
          <div className="image-container">
            <img src={image1} alt="" className="image-fit" />
            <button className="btn">
              <span className="button-text">
              Jewelry Section <span className="long-arrow"><LiaLongArrowAltRightSolid /></span>
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
                Special Women <span className=' text-xs text-red-600 md:mr-32'>40% OFF</span> <span className="long-arrow"><LiaLongArrowAltRightSolid /></span>
              </span>
            </button>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div className="page-container">
          <div className="image-container">
            <img src={men} alt="" className="image-fit" />
            <button className="btn">
              <span className="button-text">
                Men's Section <span className="long-arrow"><LiaLongArrowAltRightSolid /></span>
              </span>
            </button>
          </div>
          <div className="image-container">
            <img src={kids} alt="" className="image-fit" />
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
      </SwiperSlide>

      {/* Custom navigation arrows */}
      <div className="custom-prev"><span className="long-arrow"><LiaLongArrowAltRightSolid className='mb-5' style={{ transform: 'rotate(180deg)' }} /></span></div>
      <div className="custom-next"><span className="long-arrow"><LiaLongArrowAltRightSolid className=' mb-5' /></span></div>
    </Swiper>
  );
};

export default ProductSwiper;
