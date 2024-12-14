import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/shop.css';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchProducts = async () => {
            try {
                const response = await fetch('https://1uaneumo6k.execute-api.eu-north-1.amazonaws.com/prod/api/products/getproducts');
    
                // Check if the response is okay (status 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                // Parse the JSON response
                const data = await response.json();
                const parsedData = JSON.parse(data.body)
                console.log('Fetched products:', parsedData);
    
                // Set the products state with the fetched data
                setProducts(parsedData.data || []);
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]); // Fallback to empty array to avoid `.map` errors
            } finally {
                // Set loading to false after the fetch is complete
                setLoading(false);
            }
        };
    
        fetchProducts();
    }, []);

    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen py-20">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      );
    }    
    

    return (
        <div className='pt-28'>
            <div className="shop_navheaders">
                <div className="navs_section">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-8">
            {products.map((product) => (
              <div key={product._id} className="text-center mb-6">
                <img
                  src={product.images?.[0]?.url || '/placeholder.jpg'} // Handle missing images gracefully
                  alt={product.title}
                  className="w-full h-[600px] object-cover" // Adjust height and object-fit
                />
                <div className="product_description_details">
                  <h2 className="font-semibold text-lg">{product.title}</h2>
                  <p className="text-gray-500 text-xs mb-2">{product.colors.join(', ')}</p>
                  <p className="font-medium">{product.price} $</p>
                </div>
              </div>
            ))}
            </div>
        </div>
    );
}
