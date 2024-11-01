import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Button, TextField, Typography, Box, Grid, MenuItem, Select, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, FormHelperText, Input } from '@mui/material';
import axios from 'axios';

const AdminDashProducts = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    category: '',
    price: 0,
    stock: 0,
    brand: '',
    colors: '',
    sizes: [],
    images: ''
  });
  const [editProduct, setEditProduct] = useState(null); // Product to be edited

  const handleToggleForm = () => setShowForm(!showForm);

  // Handle file input change for file upload
  const handleFileChange = (e) => {
    setNewProduct({
      ...newProduct,
      images: e.target.files[0],
    });
  };

  // General input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  // Fetch all products on component mount
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Function to fetch products
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to add a new product
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newProduct).forEach((key) => {
      formData.append(key, newProduct[key]);
    });

    try {
      await axios.post('http://localhost:5000/api/admin/add-product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchAllProducts();
      setShowForm(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Function to open edit popup with product details
  const handleEdit = (product) => {
    setEditProduct(product);
  };

  // Update product details
  const handleUpdateSubmit = async () => {
    const formData = new FormData();
    Object.keys(editProduct).forEach((key) => {
      formData.append(key, editProduct[key]);
    });

    try {
      await axios.put(`http://localhost:5000/api/admin/update-product/${editProduct._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchAllProducts();
      setEditProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Delete product function
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/delete/${productId}`);
      fetchAllProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Typography variant="h4" gutterBottom>Product Management</Typography>

      {/* Product Table */}
      <table className="min-w-full bg-white border-separate table-auto border border-gray-200">
        <thead>
          <tr className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg">
            <th className="py-4 px-6">Product Name</th>
            <th className="py-4 px-6 text-center">Category</th>
            <th className="py-4 px-6 text-center">Images</th>
            <th className="py-4 px-6 text-center">Price</th>
            <th className="py-4 px-6 text-center">Colors</th>
            <th className="py-4 px-6 text-center">Sizes</th>
            <th className="py-4 px-6 text-center">Stock</th>
            <th className="py-4 px-6 text-center">Brand</th>
            <th className="py-4 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id} className="bg-white border-b border-gray-200 hover:bg-gray-100">
                <td className="py-4 px-6 text-center">{product.title}</td>
                <td className="py-4 px-6 text-center">{product.category}</td>
                <td className="py-4 px-6 text-center">{product.image}</td>
                <td className="py-4 px-6 text-center">${product.price}</td>
                <td className="py-4 px-6 text-center">{product.colors?.join(', ')}</td>
                <td className="py-4 px-6 text-center">{product.sizes?.join(', ')}</td>
                <td className="py-4 px-6 text-center">{product.stock}</td>
                <td className="py-4 px-6 text-center">{product.brand}</td>
                <td className="py-4 px-6 text-center">
                  <Button onClick={() => handleEdit(product)}><FiEdit /> Edit</Button>
                  <Button color="secondary" onClick={() => handleDelete(product._id)}><FiTrash2 /> Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-6 text-gray-500 text-lg">No products found</td>
            </tr>
          )}
        </tbody>
      </table>



      {/* Button to Show Form */}
      <button type="button" className="button" onClick={handleToggleForm}>
        <span className="button__text">{showForm ? 'Cancel' : 'Add Product'}</span>
        <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
      </button>

      {/* Product Form (Hidden/Shown on Button Click) */}
      {showForm && (
  <Box
    sx={{
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    }}
  >
    <Typography variant="h5" gutterBottom>
      Add a New Product
    </Typography>
    <form onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        {/* Product Title */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Product Title"
            name="title"
            value={newProduct.title}
            onChange={handleInputChange}
            required
          />
        </Grid>

        {/* Product Description */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={3}
            value={newProduct.description}
            onChange={handleInputChange}
            required
          />
        </Grid>

        {/* Category */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="Men">Men</MenuItem>
              <MenuItem value="Women">Women</MenuItem>
              <MenuItem value="Kids">Kids</MenuItem>
              <MenuItem value="Accessories">Accessories</MenuItem>
              <MenuItem value="Shoes">Shoes</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Price */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
        </Grid>

        {/* Stock */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Stock"
            name="stock"
            type="number"
            value={newProduct.stock}
            onChange={handleInputChange}
            required
          />
        </Grid>

        {/* Brand */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Brand"
            name="brand"
            value={newProduct.brand}
            onChange={handleInputChange}
            required
          />
        </Grid>

        {/* Colors */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Colors (comma-separated)"
            name="colors"
            value={newProduct.colors}
            onChange={handleInputChange}
            helperText="Example: Red, Blue, Green"
            required
          />
        </Grid>

        {/* Sizes */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Sizes</InputLabel>
            <Select
              name="sizes"
              multiple
              value={newProduct.sizes}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="XS">XS</MenuItem>
              <MenuItem value="S">S</MenuItem>
              <MenuItem value="M">M</MenuItem>
              <MenuItem value="L">L</MenuItem>
              <MenuItem value="XL">XL</MenuItem>
              <MenuItem value="XXL">XXL</MenuItem>
            </Select>
            <FormHelperText>Select multiple sizes if applicable</FormHelperText>
          </FormControl>
        </Grid>

        {/* Images */}
        <Grid item xs={12}>
        <Input
            fullWidth
            type="file" // Change input type to file
            accept="image/*" // Restrict file selection to images
            label="Upload Image"
            name="images"// Update the handler to handle file input
        />

        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  </Box>
)}

{/* Edit Product Popup */}
    {editProduct && (
            <Dialog open={Boolean(editProduct)} onClose={() => setEditProduct(null)}>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogContent>
                <TextField className='mt-4' label="Title" name="title" value={editProduct.title} onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })} fullWidth />
                <TextField label="Description" name="description" value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} fullWidth />
                <TextField label="Category" name="category" value={editProduct.category} onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })} fullWidth />
                <TextField label="Price" name="price" value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} fullWidth />
                <TextField label="Stock" name="stock" value={editProduct.stock} onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })} fullWidth />
                <TextField label="Brand" name="brand" value={editProduct.brand} onChange={(e) => setEditProduct({ ...editProduct, brand: e.target.value })} fullWidth />
                <TextField label="Colors" name="colors" value={editProduct.colors} onChange={(e) => setEditProduct({ ...editProduct, colors: e.target.value })} fullWidth />
                <TextField label="Sizes" name="sizes" value={editProduct.sizes} onChange={(e) => setEditProduct({ ...editProduct, sizes: e.target.value })} fullWidth />
                <TextField label="images" name="images" value={editProduct.images} onChange={(e) => setEditProduct({ ...editProduct, images: e.target.value })} fullWidth />
                {/* Additional fields for description, category, etc. */}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setEditProduct(null)} color="secondary">Cancel</Button>
                <Button onClick={handleUpdateSubmit} color="primary">Update</Button>
              </DialogActions>
            </Dialog>
          )}

    </div>
  );
};

export default AdminDashProducts;
