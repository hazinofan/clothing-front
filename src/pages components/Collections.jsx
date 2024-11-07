import React from 'react'
import cat1 from '../assets/cat1.webp';
import cat2 from '../assets/cat2.webp';
import cat3 from '../assets/cat3.webp';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';
import '../css/collection.css'

export default function Collections() {
  return (
    <div>
        <div className="div-container">
          <div className="divimage-container">
            <img src='/assets/cat3.webp' alt="" className="image-fit" />
            <button className="btn">
              <span className="button-text text-xl">
              EXPLORE BOTTOMS <span className="long-arrow"><LiaLongArrowAltRightSolid /></span>
              </span>
            </button>
          </div>
          <div className="divimage-container">
            <img src='/assets/cat2.webp' alt="" className="image-fit" />
            <button className="btn">
              <span className="button-text text-xl">
                EXPLORE TOPS <span className="long-arrow"><LiaLongArrowAltRightSolid /></span>
              </span>
            </button>
          </div>
          <div className="divimage-container">
            <img src='/assets/cat1.webp' alt="" className="image-fit" />
            <button className="btn">
              <span className="button-text text-xl">
                MIX + MATCH <span className="long-arrow"><LiaLongArrowAltRightSolid /></span>
              </span>
            </button>
          </div>
        </div>
    </div>
  )
}
