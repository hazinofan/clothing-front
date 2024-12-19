import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    details: '',
    price: '',
    priceBefore: '',
    category: '',
    colors: [],
    sizes: [],
  });

  const [images, setImages] = useState([]);
  const [uploadFileNames, setUploadFileNames] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const COLORS = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Purple', 'Orange', 'Pink', 'Gray'];
  const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const CATEGORIES = ['Men', 'Women', 'Jewelry'];

  // Handle change in text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setUploadFileNames(files.map(file => file.name));
  };

  // Handle checkbox change for colors and sizes
  const handleCheckboxChange = (e, fieldName) => {
    const { value, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: checked
        ? [...prevState[fieldName], value] // Add the value if checked
        : prevState[fieldName].filter(item => item !== value), // Remove if unchecked
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.title || !formData.description || !formData.price || !formData.colors.length || !formData.category || images.length === 0) {
      setErrorMessage('Please fill all required fields and upload at least one image.');
      return;
    }

    try {
      const imagesBase64 = await Promise.all(
        images.map(file =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]); // Extract base64 data
            reader.onerror = reject;
          })
        )
      );

      const productData = {
        ...formData,
        color: formData.colors.length > 0 ? formData.colors[0] : undefined, // Select the first color
        price: parseFloat(formData.price),
        priceBefore: formData.priceBefore ? parseFloat(formData.priceBefore) : undefined,
        imagesBase64,
      };
      

      const response = await axios.post('https://1uaneumo6k.execute-api.eu-north-1.amazonaws.com/prod/api/products/add-products', productData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        setSuccessMessage('Product added successfully!');
        setFormData({
          title: '',
          description: '',
          details: '',
          price: '',
          priceBefore: '',
          category: '',
          colors: [],
          sizes: [],
        });
        setImages([]);
        setUploadFileNames([]);
      }
    } catch (error) {
      setErrorMessage('Failed to add product. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="pt-24 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add a New Product</h2>
      
      {errorMessage && <div className="alert alert-error mb-4">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success mb-4">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="form-control gap-4">
        <input type="text" name="title" placeholder="Title" className="input input-bordered" value={formData.title} onChange={handleInputChange} required />
        <textarea name="description" placeholder="Description" className="textarea textarea-bordered" value={formData.description} onChange={handleInputChange} required></textarea>
        <textarea name="details" placeholder="Details" className="textarea textarea-bordered" value={formData.details} onChange={handleInputChange}></textarea>
        <input type="number" name="price" placeholder="Price" className="input input-bordered" value={formData.price} onChange={handleInputChange} required />
        <input type="number" name="priceBefore" placeholder="Price Before (optional)" className="input input-bordered" value={formData.priceBefore} onChange={handleInputChange} />

        <select name="category" className="select select-bordered" value={formData.category} onChange={handleInputChange} required>
          <option value="">Select a category</option>
          {CATEGORIES.map(category => <option key={category} value={category}>{category}</option>)}
        </select>

        <p className='text-xl'>Colors:</p> 
        <div className='flex gap-2'>
          {COLORS.map(color => (
            <label key={color} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={color}
                checked={formData.colors.includes(color)}
                onChange={(e) => handleCheckboxChange(e, 'colors')}
              />
              {color}
            </label>
          ))}
        </div>

        <p className='text-xl'>Sizes:</p>
        <div className='flex gap-8'>
          {SIZES.map(size => (
            <label key={size} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={size}
                checked={formData.sizes.includes(size)}
                onChange={(e) => handleCheckboxChange(e, 'sizes')}
              />
              {size}
            </label>
          ))}
        </div>

        <input type="file" multiple accept="image/*" className="file-input file-input-bordered" onChange={handleFileChange} />
        
        <ul className="list-disc pl-5">
          {uploadFileNames.map((fileName, index) => <li key={index}>{fileName}</li>)}
        </ul>

        <button type="submit" className="bg-gray-300 border-2 border-black hover:text-white hover:bg-black hover:transition-colors p-3 ">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
