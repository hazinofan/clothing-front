import React, { useState, useEffect } from 'react';
import '../css/responsive.css';

const CouponCard = ({ coupon }) => {
  return (
    <div className="coupon-card">
      <img src='/assets/logo.png' alt="coupon-logo" className="logo" />
      <h3>{coupon.description}</h3>
      <div className="coupon-row">
        <span id="cpnCode">{coupon.code}</span>
      </div>
      <p>Valid Till: {coupon.validTill}</p>
      <div className="circle1"></div>
      <div className="circle2"></div>
    </div>
  );
};

export default function DashCoupons() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchedCoupons = [
      {
        description: "20% flat off on all rides within the city using HDFC Credit Card",
        code: "STEALDEAL20",
        validTill: "20 Dec, 2021"
      },
      {
        description: "10% off on weekend rides using XYZ Credit Card",
        code: "WEEKEND10",
        validTill: "15 Nov, 2021"
      }
      // Add more coupon objects as needed
    ];
    setCoupons(fetchedCoupons);
  }, []);

  return (
    <div className="container">
      <h1 className=' text-5xl mb-8 text-center'> Coupon Codes </h1>
      <p className="text-center text-lg text-gray-600 mb-24">
        Unlock exclusive discounts and offers with our latest coupon codes! Whether you're shopping for the season's hottest trends or looking for deals on essentials, we've got you covered. Use these codes at checkout and save big on your next purchase.
      </p>
      <div className="coupon-grid">
        {coupons.map((coupon, index) => (
          <CouponCard key={index} coupon={coupon} />
        ))}
      </div>
    </div>
  );
}
