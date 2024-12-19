import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import axios from 'axios';
import AddProductForm from './ProductsTable';

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
    sizes: '',
    images: null, // For file input
  });
  const [editProduct, setEditProduct] = useState(null);

  const handleToggleForm = () => setShowForm(!showForm);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (editProduct) {
      setEditProduct({
        ...editProduct,
        images: file,
      });
    } else {
      setNewProduct({
        ...newProduct,
        images: file,
      });
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(
        'https://1uaneumo6k.execute-api.eu-north-1.amazonaws.com/prod/api/products/getproducts',
        {
          method: 'GET',
        }
      );

      if (response.ok) {
        const data = await response.json();
        const parsedData = JSON.parse(data.body).data;
        console.log('Fetched products:', parsedData);
        setProducts(parsedData);
      } else {
        console.error('Failed to fetch products:', response.status, await response.text());
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async () => {
    const formData = new FormData();
    Object.keys(newProduct).forEach((key) => {
      formData.append(key, newProduct[key]);
    });

    try {
      const response = await axios.post(
        'https://1uaneumo6k.execute-api.eu-north-1.amazonaws.com/prod/api/products/add-product',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      if (response.status === 201) {
        fetchAllProducts();
        setShowForm(false);
        setNewProduct({
          title: '',
          description: '',
          category: '',
          price: 0,
          stock: 0,
          brand: '',
          colors: '',
          sizes: '',
          images: null,
        });
      } else {
        console.error('Failed to add product:', response.data);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateSubmit = async () => {
    const formData = new FormData();
  
    Object.entries(editProduct).forEach(([key, value]) => {
      if (key !== 'newImages' && key !== 'images') {
        formData.append(key, value);
      }
    });
  
    if (editProduct.newImages) {
      editProduct.newImages.forEach((image) => {
        formData.append('images', image);
      });
    }
  
    try {
      const response = await fetch(
        'https://1uaneumo6k.execute-api.eu-north-1.amazonaws.com/prod/api/products/update-product',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer YOUR_JWT_TOKEN', // Replace with actual token
          },
          body: formData,
        }
      );
  
      if (response.ok) {
        const updatedProduct = await response.json();
        console.log('Product updated:', updatedProduct);
        fetchAllProducts();
        setEditProduct(null);
      } else {
        console.error('Failed to update product:', response.status, await response.text());
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `https://1uaneumo6k.execute-api.eu-north-1.amazonaws.com/prod/api/products/delete-product/${productId}`
      );
      fetchAllProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 pt-20">
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>

      <table className="min-w-full bg-white border-separate table-auto border border-gray-200">
        <thead>
          <tr className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg">
            <th className="py-4 px-6">Product Name</th>
            <th className="py-4 px-6 text-center">Category</th>
            <th className="py-4 px-6 text-center">Images</th>
            <th className="py-4 px-6 text-center">Price</th>
            <th className="py-4 px-6 text-center">Colors</th>
            <th className="py-4 px-6 text-center">Sizes</th>
            <th className="py-4 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id} className="bg-white border-b border-gray-200 hover:bg-gray-100">
                <td className="py-4 px-6">{product.title}</td>
                <td className="py-4 px-6">{product.category}</td>
                <td className="py-4 px-6">{product.images?.length || 0} image(s)</td>
                <td className="py-4 px-6">{product.price}$</td>
                <td className="py-4 px-6">{product.colors || 'N/A'}</td>
                <td className="py-4 px-6">{product.sizes?.join(', ') || 'N/A'}</td>
                <td className="py-4 px-6 flex gap-2">
                  <Button onClick={() => setEditProduct(product)}>
                    <FiEdit /> Edit
                  </Button>
                  <Button color="secondary" onClick={() => handleDelete(product._id)}>
                    <FiTrash2 /> Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-500">
                Loading ...
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showForm && (
        <AddProductForm />
      )}

    {editProduct && (
      <Dialog open={Boolean(editProduct)} onClose={() => setEditProduct(null)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={editProduct.title}
            onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Description"
            name="description"
            value={editProduct.description}
            onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Category"
            name="category"
            value={editProduct.category}
            onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={editProduct.price}
            onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={editProduct.stock}
            onChange={(e) => setEditProduct({ ...editProduct, stock: Number(e.target.value) })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Brand"
            name="brand"
            value={editProduct.brand}
            onChange={(e) => setEditProduct({ ...editProduct, brand: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Colors"
            name="colors"
            value={editProduct.colors}
            onChange={(e) => setEditProduct({ ...editProduct, colors: e.target.value })}
            helperText="Separate multiple colors with commas"
            fullWidth
            margin="dense"
          />
          <TextField
            label="Sizes"
            name="sizes"
            value={editProduct.sizes}
            onChange={(e) => setEditProduct({ ...editProduct, sizes: e.target.value })}
            helperText="Separate multiple sizes with commas"
            fullWidth
            margin="dense"
          />
          <Typography variant="body1" className="mt-4 mb-2">
            Current Images: {Array.isArray(editProduct.images) ? editProduct.images.join(', ') : 'No images'}
          </Typography>
          <Button variant="outlined" component="label" fullWidth>
            Upload New Images
            <input
              type="file"
              multiple
              hidden
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  newImages: Array.from(e.target.files),
                })
              }
        />
      </Button>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setEditProduct(null)} color="secondary">
        Cancel
      </Button>
      <Button onClick={handleUpdateSubmit} color="primary">
        Update
      </Button>
    </DialogActions>
  </Dialog>
)}
    </div>
  );
};

export default AdminDashProducts;
