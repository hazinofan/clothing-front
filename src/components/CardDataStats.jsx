import React from 'react';
import { BsFillHandbagFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { GrMoney } from 'react-icons/gr';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CardDataStats() {

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-10 justify-center mb-10">
        <div className="bg-white p-6 pb-0 shadow-xl items-center justify-between w-80">
          <div className="items-center">
            {/* Icon */}
            <div className="bg-gray-100 p-4 rounded-full w-14 mb-4">
              <GrMoney style={{ fontSize: '24px' }} />
            </div>
            {/* Total Profit */}
            <div className="ml-4">
              <h2 className="text-3xl font-semibold">$3.456K</h2>
              <p className="text-gray-500">Total Profit</p>
            </div>
          </div>
          {/* Percentage Change */}
          <div className="text-green-500 text-sm relative bottom-4" style={{ float: 'inline-end' }}>
            <p>0.43% ↑</p>
          </div>
        </div>

        <div className="bg-white p-6 pb-0 shadow-xl items-center justify-between w-80">
          <div className="items-center">
            {/* Icon */}
            <div className="bg-gray-100 p-4 rounded-full w-14 mb-4">
              <BsFillHandbagFill style={{ fontSize: '24px' }} />
            </div>
            {/* Total Products */}
            <div className="ml-4">
              <h2 className="text-2xl font-semibold">56</h2>
              <p className="text-gray-500">Total Products</p>
            </div>
          </div>
          {/* Percentage Change */}
          <div className="text-green-500 text-sm relative bottom-4" style={{ float: 'inline-end' }}>
            <p>0.43% ↑</p>
          </div>
        </div>

        <div className="bg-white p-6 pb-0 shadow-xl items-center justify-between w-80">
          <div className="items-center">
            {/* Icon */}
            <div className="bg-gray-100 p-4 rounded-full w-14 mb-4">
              <FaUser style={{ fontSize: '24px' }} />
            </div>
            {/* Total Users */}
            <div className="ml-4">
              <h2 className="text-2xl font-semibold">260</h2>
              <p className="text-gray-500">Total Users</p>
            </div>
          </div>
          {/* Percentage Change */}
          <div className="text-green-500 text-sm relative bottom-4" style={{ float: 'inline-end' }}>
            <p>0.43% ↑</p>
          </div>
        </div>
      </div>
    </div>
  );
}
