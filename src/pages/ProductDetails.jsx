import { GoShareAndroid } from "react-icons/go";
import { Carousel } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegCopy, FaRegHeart } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function ProductDetails() {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A8",
    "#FFD700",
    "#000000",
    "#BA56",
  ];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const copyToClipboard = () => {
    const pageUrl = window.location.href; // Get current page URL
    navigator.clipboard.writeText(pageUrl); // Copy to clipboard
    setAlertVisible(true); // Show success alert
    setTimeout(() => setAlertVisible(false), 3000); // Hide alert after 3 seconds
  };

  return (
    <>
      <div className="container min-h-screen">
        {/* Carousel Section */}
        <div className="h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[40rem] cursor-grab active:cursor-grabbing">
          <Carousel
            slideInterval={5000}
            slide={false}
            indicators={false}
            className="overflow-hidden"
          >
            {/* Slide 1 */}
            <div className="flex justify-center">
              <img
                className="w-1/3 h-full object-cover"
                src="/assets/caroussel1.png"
                alt="Slide 1"
              />
              <img
                className="w-1/3 h-full object-cover"
                src="/assets/caroussel1.png"
                alt="Slide 2"
              />
              <img
                className="w-1/3 h-full object-cover"
                src="/assets/caroussel2.png"
                alt="Slide 3"
              />
            </div>
            {/* Slide 2 */}
            <div className="flex justify-center">
              <img
                className="w-1/3 h-full object-cover"
                src="/assets/caroussel2.png"
                alt="Slide 4"
              />
              <img
                className="w-1/3 h-full object-cover"
                src="/assets/caroussel1.png"
                alt="Slide 5"
              />
              <img
                className="w-1/3 h-full object-cover"
                src="/assets/caroussel2.png"
                alt="Slide 6"
              />
            </div>
          </Carousel>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {/* Description Section */}
          <div className=" px-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-700 tracking-wide mb-2">
              DESCRIPTION
            </h3>
            <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
              Sculpted scoop neckline. Double-layered support. A ribbed,
              athletic-inspired bralette that's redefining active comfort. Wide
              straps and thoughtful compression deliver all-day support without
              the squeeze.
            </p>
          </div>

          {/* Details Section */}
          <div className="px-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-700 tracking-wide mb-2">
              DETAILS
            </h3>
            <ul className="list-disc text-gray-800 text-base sm:text-lg pl-4">
              <li>Double-layered ribbed construction for medium support</li>
              <li>Wider straps that stay put during movement</li>
              <li>Seamless underband designed to prevent digging</li>
              <li>Innovative micro-ribbing that moves with you</li>
              <li>Moisture-wicking and anti-odor technology</li>
              <li>Performance blend: 94% Nylon, 6% Spandex</li>
            </ul>
          </div>

          {/* Color and Size Selection */}
          <div className=" px-5 " style={{ justifyItems: "center" }}>
            <h3 className="text-sm font-bold text-gray-700 tracking-wide mb-2">
              Select a Color:
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-sm cursor-pointer border-2 ${
                    color === selectedColor
                      ? "border-gray-500"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                />
              ))}
            </div>

            {/* Display Selected Color */}
            <div className="flex gap-1 items-end">
              <p className="text-3xl font-bold text-gray-900 mt-4">$29.99</p>
              <p className="text-red-600 text-sm line-through pb-1"> $39.99</p>
            </div>
            <p className="mt-4 text-base sm:text-lg text-gray-700">
              Selected Color:{" "}
              <span className="font-semibold" style={{ color: selectedColor }}>
                {selectedColor}
              </span>
            </p>

            {/* Size Chart Modal */}
            <p className="mt-4 text-lg font-bold text-gray-500">
              Choose the Size:
            </p>
            <button
              className="btn-primary text-green-900 underline hover:text-gray-500"
              onClick={() => document.getElementById("size_modal").showModal()}
            >
              Size chart
            </button>
            <dialog id="size_modal" className="modal">
              <form method="dialog" className="modal-box ">
                <button
                  className="btn-lg btn-circle btn-ghost absolute right-2 top-2"
                  type="button"
                  onClick={() => document.getElementById("size_modal").close()}
                >
                  ✕
                </button>
                <img
                  src="/assets/sizes.png"
                  alt="sizes.png"
                  className="w-full h-full object-contain"
                />
              </form>
              <form method="dialog" className="modal-backdrop">
                <button
                  onClick={() => document.getElementById("size_modal").close()}
                ></button>
              </form>
            </dialog>

            {/* Size Options */}
            <div className="flex gap-3 cursor-pointer mt-5">
              {["S", "M", "L", "XL"].map((size) => (
                <div
                  key={size}
                  className="text-base sm:text-lg px-4 sm:px-5 py-2 sm:py-3 border border-gray-400 hover:border-black"
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-wrap gap-5 mt-10 justify-center">
          <button
            type="button"
            className="flex justify-center items-center w-1/3 gap-2 shadow-xl text-sm sm:text-lg bg-gray-50 px-4 py-2 border border-black hover:bg-black hover:text-white transition-all"
            onClick={() => document.getElementById("modal").showModal()}
          >
            <GoShareAndroid />
            Share
          </button>
          <dialog id="modal" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-lg">
                Share this product with your friends
              </h3>
              <p className="py-4">Use the link below to share this page:</p>

              {/* URL display and copy button */}
              <div className="flex items-center gap-4 p-4 rounded-lg">
                <input
                  type="text"
                  value={window.location.href} // Dynamically fetch current page URL
                  readOnly
                  className="flex-1 px-2 py-3 border border-gray-300 rounded-lg bg-white text-sm"
                />
                <FaRegCopy
                  className="text-xl cursor-pointer"
                  title="Copy to clipboard"
                  onClick={copyToClipboard} // Attach the copy function here
                />
              </div>

              {/* Alert message */}
              {alertVisible && (
                <div
                  role="alert"
                  className="flex items-center mt-4 p-2 text-green-700 bg-green-100 border border-green-300 rounded-md"
                >
                  <IoMdCheckmarkCircleOutline className="w-5 h-5 mr-2" />
                  <span>Link copied to clipboard!</span>
                </div>
              )}

              {/* Close button */}
              <div className="modal-action mt-4">
                <button
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black transition-all"
                  onClick={() => document.getElementById("modal").close()}
                >
                  Close
                </button>
              </div>
            </div>
          </dialog>
          <button
            type="button"
            className="flex justify-center items-center w-1/3 gap-2 shadow-xl text-sm sm:text-lg bg-gray-50 px-4 py-2 border border-black hover:bg-black hover:text-white transition-all"
          >
            <FaRegHeart />
            Add to wishlist
          </button>
        </div>
      </div>

      <div className="">
        <h1 className="text-4xl pl-12 mt-16"> SIMILAR PRODUCTS :</h1>
      </div>
    </>
  );
}
