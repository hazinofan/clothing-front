import React, { useEffect, useState } from 'react';
import mesures from '../assets/mesures.png';

export default function DashMesures() {
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    bust: '',
    braSize: '',
    waist: '',
    hips: '',
    preferences: ''
  });
  const [submittedData, setSubmittedData] = useState(null); // For storing fetched data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchMeasurements = async () => {
      const token = localStorage.getItem('token'); 

      if (!token) {
        console.error('User is not authenticated');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/user/measurement', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          const measurements = data.measurements; // Assuming backend returns { measurements: { ...data } }
          console.log(data.measurements)
          
          if (measurements) {
            setFormData(measurements); // Populate form with fetched data
            setSubmittedData(measurements); // Display fetched data in the card
          }
        } else {
          console.error('Failed to fetch measurements');
        }
      } catch (error) {
        console.error('Failed to fetch measurements:', error);
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchMeasurements(); // Call the fetch function
  }, []); // Empty dependency array ensures it runs only on mount


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 

    if (!token) {
      console.error('User is not authenticated');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/user/measurement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Measurement updated successfully');
        setSubmittedData(formData); // Save the submitted data to display in a card
        setOpenForm(false); // Close the popup
      } else {
        console.error('Error updating Measurement');
      }
    } catch (error) {
      console.error('Failed to update Measurement:', error);
    }
  };

  const handleReset = () => {
    setFormData({
      height: '',
      weight: '',
      bust: '',
      braSize: '',
      waist: '',
      hips: '',
      preferences: ''
    });
  };

  const handleFormButton = () => {
    setOpenForm(!openForm);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen"> {/* Full height centering */}
          <div role="status" className="flex flex-col items-center">
              <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                  <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                  />
                  <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                  />
              </svg>
              <span className="sr-only">Loading...</span>
          </div>
      </div>
  );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-bold mb-8">MY MEASUREMENTS</h1>
      <p className="text-center mb-6">This section will help you choose clothes tailored for you! Enter your measurements:</p>
      <button onClick={handleFormButton} className="relative px-5 py-2 font-medium text-white group">
        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
        <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
        <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
        <span className="relative">Add Mesurements</span>
      </button>
      {openForm && (
        <div className=" flex text-center gap-4 mt-8">
        <form onSubmit={handleSubmit} className="mx-auto max-w-lg flex-grow">
        <div className="mb-4 flex items-center">
          <label htmlFor="height" className="w-1/4 font-semibold text-gray-600">Height:</label>
          <select
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-3/4 border p-2 rounded-lg text-sm"
            required
          >
            <option value="">Select your height</option>
            {[...Array(19)].map((_, index) => {
              const heightInCm = 120 + index * 5;
              const heightInInches = (heightInCm * 0.393701).toFixed(1);
              return (
                <option key={heightInCm} value={`${heightInCm} cm / ${heightInInches} in`}>
                  {heightInCm} cm / {heightInInches} in
                </option>
              );
            })}
          </select>
        </div>
  
  
          <div className="mb-4 flex items-center">
            <label htmlFor="weight" className="w-1/4 font-semibold text-gray-600">Weight:</label>
            <select
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="border w-full p-3 rounded-lg text-sm -lg text-sm mt-2"
              required
            >
              <option value="">Select your weight</option>
              {[...Array(25)].map((_, index) => {
                const weightInKg = 30 + index * 5;
                const weightInLbs = (weightInKg * 2.20462).toFixed(1); // Convert kg to lbs
                return (
                  <option key={weightInKg} value={`${weightInKg} Kg / ${weightInLbs} Lbs`}>
                    {weightInKg} Kg / {weightInLbs} Lbs
                  </option>
                );
              })}
            </select>
          </div>
  
          <div className="mb-4 flex items-center">
              <label htmlFor="bust" className="w-1/4 font-semibold text-gray-600">Bust:</label>
              <select
                name="bust"
                value={formData.bust}
                onChange={handleChange}
                className="border w-full p-3 rounded-lg text-sm -lg text-sm mt-2"
                required
              >
                <option value="">Select your bust size</option>
                {[...Array(17).keys()].map(i => {
                  const size = 60 + i * 5; // Generates sizes from 60 to 140
                  return (
                    <option key={size} value={`${size} cm / ${(size / 2.54).toFixed(1)} in`}>
                      {size} cm / {(size / 2.54).toFixed(1)} in
                    </option>
                  );
                })}
              </select>
          </div>
  
  
          <div className="mb-4 flex items-center">
              <label htmlFor="braSize" className="w-1/4 font-semibold text-gray-600">Bra Size:</label>
              <select
                name="braSize"
                value={formData.braSize}
                onChange={handleChange}
                className="border w-full p-3 rounded-lg text-sm -lg text-sm mt-2"
                required
              >
                <option value="">Select your bra size</option>
                {[
                  "30A", "30B", "30C", "30D", "30DD", "30E", "30F", "30G", "30H", "30I", "30J", "30K",
                  "32A", "32B", "32C", "32D", "32DD", "32E", "32F", "32G", "32H", "32I", "32J", "32K",
                  "34A", "34B", "34C", "34D", "34DD", "34E", "34F", "34G", "34H", "34I", "34J", "34K",
                  "36A", "36B", "36C", "36D", "36DD", "36E", "36F", "36G", "36H", "36I", "36J", "36K",
                  "38A", "38B", "38C", "38D", "38DD", "38E", "38F", "38G", "38H", "38I", "38J", "38K",
                  "40A", "40B", "40C", "40D", "40DD", "40E", "40F", "40G", "40H", "40I", "40J", "40K",
                  "42A", "42B", "42C", "42D", "42DD", "42E", "42F", "42G", "42H", "42I", "42J", "42K",
                  "44A", "44B", "44C", "44D", "44DD", "44E", "44F", "44G", "44H", "44I", "44J", "44K",
                ].map(size => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
  
            <div className="mb-4 flex items-center">
                <label htmlFor="waist" className="w-1/4 font-semibold text-gray-600">Waist:</label>
                <select
                  name="waist"
                  value={formData.waist}
                  onChange={handleChange}
                  className="border w-full p-3 rounded-lg text-sm -lg text-sm mt-2"
                  required
                >
                  <option value="">Select your waist size</option>
                  {[...Array(26).keys()].map(i => {
                    const size = 35 + i * 5; // Generates sizes from 35 to 160
                    return (
                      <option key={size} value={`${size} cm / ${(size / 2.54).toFixed(1)} in`}>
                        {size} cm / {(size / 2.54).toFixed(1)} in
                      </option>
                    );
                  })}
                </select>
              </div>
  
  
              <div className="mb-4 flex items-center">
                  <label htmlFor="hips" className="w-1/4 font-semibold text-gray-600">Hips:</label>
                  <select
                    name="hips"
                    value={formData.hips}
                    onChange={handleChange}
                    className="border w-full p-3 rounded-lg text-sm -lg text-sm mt-2"
                    required
                  >
                    <option value="">Select your hip size</option>
                    {[...Array(17).keys()].map(i => {
                      const size = 70 + i * 5; // Generates sizes from 70 to 150
                      return (
                        <option key={size} value={`${size} cm / ${(size / 2.54).toFixed(1)} in`}>
                          {size} cm / {(size / 2.54).toFixed(1)} in
                        </option>
                      );
                    })}
                  </select>
                </div>
  
  
          <div className="mb-4 flex items-center">
            <label htmlFor="preferences" className="w-1/4 font-semibold text-gray-600">Preferences:</label>
            <select
              name="preferences"
              value={formData.preferences}
              onChange={handleChange}
              className="border w-full p-3 rounded-lg text-sm -lg text-sm mt-2"
              required
            >
              <option value="">Select your preference</option>
              <option value="True to size">True to size</option>
              <option value="One size up">One size up</option>
              <option value="One size down">One size down</option>
            </select>
          </div>
  
          <div className="flex justify-between">
              <button type='submit' className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white">
                <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">Submit</span>
              </button>
            <button type="button" onClick={handleReset} className="bg-gray-400 text-white px-4 py-2 rounded-lg text-sm ">
              Cancel
            </button>
          </div>
        </form>
        <div className="flex-grow" style={{textAlign: '-webkit-center'}}>
          <img src={mesures} alt="" className=' w-48' />
        </div>
        <div className=" w-72">
        <ul className="space-y-6">
            <li className="flex items-start">
              <div className="flex-shrink-0 bg-black text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
                1
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold">Chest</h4>
                <p className="text-gray-600">To measure your chest size, place the tape measure around your chest at the level of the tips of your breasts.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 bg-black text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
                2
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold">Size</h4>
                <p className="text-gray-600">To measure your waistline, place the tape measure around the smallest part of your waist.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 bg-black text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
                3
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold">Hips</h4>
                <p className="text-gray-600">To measure your hip circumference, place the tape measure around the widest part of your pelvis, at the height of your buttocks.</p>
              </div>
            </li>
          </ul>

        </div>
        </div>
      ) }

      {!openForm && formData && (
        <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Your Measurements</h2>
          <p><strong>Height:</strong> {formData.height}</p>
          <p><strong>Weight:</strong> {formData.weight}</p>
          <p><strong>Bust:</strong> {formData.bust}</p>
          <p><strong>Bra Size:</strong> {formData.braSize}</p>
          <p><strong>Waist:</strong> {formData.waist}</p>
          <p><strong>Hips:</strong> {formData.hips}</p>
          <p><strong>Preferences:</strong> {formData.preferences}</p>
        </div>
      )}
      
    </div>
  );
}
