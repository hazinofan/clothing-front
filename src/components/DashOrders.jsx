import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashOrders() {
  // Mock data for active orders
  const activeOrders = [
    { orderId: 'ORD123', customerName: 'John Doe', orderDate: '2024-10-20', status: 'in process' },
    { orderId: 'ORD124', customerName: 'Jane Smith', orderDate: '2024-10-21', status: 'in process' },
  ];

  // Mock data for chart
  const chartData = [
    { Month: 'January', orders: 10 },
    { Month: 'February', orders: 5.5 },
    { Month: 'March', orders: 2 },
    { Month: 'April', orders: 8.5 },
    { Month: 'May', orders: 1.5 },
    { Month: 'June', orders: 5 },
    { Month: 'July', orders: 7 },
    { Month: 'August', orders: 6 },
    { Month: 'September', orders: 9 },
    { Month: 'October', orders: 4 },
    { Month: 'November', orders: 3.5 },
    { Month: 'December', orders: 8 }
    ];

  return (
    <>
      <div style={{ padding: '20px' }}>
        <h2>Active Orders</h2>
        {activeOrders.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Order ID</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Customer Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Order Date</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {activeOrders.map((order) => (
                <tr key={order.orderId}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.orderId}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.customerName}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.orderDate}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', color: 'orange' }}>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No active orders.</p>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
          <div className="flex justify-between mb-4 items-start">
            <div className="font-medium">Order Statistics</div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div class="rounded-md border border-dashed border-gray-200 p-4">
                            <div class="flex items-center mb-0.5">
                                <div class="text-xl font-semibold">10</div>
                                <span class="p-1 rounded text-[12px] font-semibold bg-blue-500/10 text-blue-500 leading-none ml-1">$80</span>
                            </div>
                            <span class="text-gray-400 text-sm">Active</span>
                        </div>
                        <div class="rounded-md border border-dashed border-gray-200 p-4">
                            <div class="flex items-center mb-0.5">
                                <div class="text-xl font-semibold">50</div>
                                <span class="p-1 rounded text-[12px] font-semibold bg-emerald-500/10 text-emerald-500 leading-none ml-1">+$469</span>
                            </div>
                            <span class="text-gray-400 text-sm">Completed</span>
                        </div>
                        <div class="rounded-md border border-dashed border-gray-200 p-4">
                            <div class="flex items-center mb-0.5">
                                <div class="text-xl font-semibold">4</div>
                                <span class="p-1 rounded text-[12px] font-semibold bg-rose-500/10 text-rose-500 leading-none ml-1">-$130</span>
                            </div>
                            <span class="text-gray-400 text-sm">Canceled</span>
                        </div>
                    </div>
          <div>
            {/* Responsive Line Chart */}
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
          <div className="flex justify-between mb-4 items-start">
            <div className="font-medium">Your Orders</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[460px]">
              <thead>
                <tr>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                    Order Num
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                    Total
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <div className="flex items-center">
                      <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">
                        order #444
                      </a>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-[13px] font-medium text-emerald-500">$235</span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <div className="flex items-center">
                      <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">
                        order #445
                      </a>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-[13px] font-medium text-green-500">$235</span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="inline-block p-1 rounded bg-orange-500/10 text-orange-500 font-medium text-[12px] leading-none">
                      In Process
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
