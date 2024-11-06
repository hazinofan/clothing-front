import React from 'react'
import '../css/shop.css'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import croptop1 from '../assets/croptop2.jpg'

const products = [
    {
      id: 1,
      image: croptop1, // replace with actual image path
      name: 'LOW HIDE THONG',
      colorOptions: 'Black + 6 colors',
      price: '303 DH',
    },
    {
      id: 2,
      image: croptop1, // replace with actual image path
      name: 'HIGH SCULPT BRIEF',
      colorOptions: 'Black + 6 colors',
      price: '303 DH',
    },
    {
      id: 3,
      image: croptop1, // replace with actual image path
      name: 'LOW HIDE THONG',
      colorOptions: 'White + 6 colors',
      price: '303 DH',
    },
    {
      id: 4,
      image: croptop1, // replace with actual image path
      name: 'HIGH SCULPT THONG',
      colorOptions: 'Black + 6 colors',
      price: '303 DH',
    },
  ];

export default function Shop() {
  return (
    <div className=' pt-28 '>
        <div className="shop_navheaders">
            <div className="navs_section" >
            <p className="relative flex gap-3 items-center group">
                WOMEN 
                <MdOutlineKeyboardArrowDown />
                <span
                    className="absolute left-0 bottom-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                ></span>
            </p>
            <p className="relative flex gap-3 items-center group">
                MEN 
                <MdOutlineKeyboardArrowDown />
                <span
                    className="absolute left-0 bottom-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                ></span>
            </p>
            <p className="relative flex gap-3 items-center group">
                KIDS 
                <MdOutlineKeyboardArrowDown />
                <span
                    className="absolute left-0 bottom-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                ></span>
            </p>
            <p className="relative flex gap-3 items-center group">
                JEWELERY 
                <MdOutlineKeyboardArrowDown />
                <span
                    className="absolute left-0 bottom-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                ></span>
            </p>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
        {products.map((product) => (
            <div key={product.id} className="text-center">
            <img
                src={product.image}
                alt={product.name}
                className="w-full object-cover"
            />
            <div className='product_description_details'>
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-gray-500 text-xs mb-2">{product.colorOptions}</p>
            <p className=" font-medium">{product.price}</p>
            </div>
            </div>
        ))}
        </div>
    </div>
  )
}
