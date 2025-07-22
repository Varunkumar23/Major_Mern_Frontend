import React, { useState, useEffect } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { Plus, Edit2, Trash2 } from "lucide-react";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [addForm, setAddForm] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });
  const [editForm, setEditForm] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };
  const handleAddSubmit = async () => {
    if (!addForm.title || !addForm.price) {
      alert("Title and price are required.");
      return;
    }
    try {
      await axiosInstance.post("/products", {
        ...addForm,
        price: Number(addForm.price),
      });
      setAddForm({ title: "", price: "", category: "", image: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleEditSubmit = async () => {
    if (!editForm.title || !editForm.price) {
      alert("Title and price are required.");
      return;
    }
    try {
      await axiosInstance.patch(`/products/${editingId}`, {
        ...editForm,
        price: Number(editForm.price),
      });
      setEditingId(null);
      setEditForm({ title: "", price: "", category: "", image: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const selectProductToEdit = (product) => {
    setEditingId(product._id);
    setEditForm({
      title: product.title || "",
      price: product.price || "",
      category: product.category || "",
      image: product.image || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axiosInstance.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-indigo-100 to-pink-100 p-6">
      <h1 className="text-5xl font-extrabold text-center text-indigo-800 mb-12 drop-shadow">
        🛒 Admin Product Dashboard
      </h1>

      {/* Add + Edit Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
        {/* Add Product */}
        <div className="bg-white border-2 border-indigo-300 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2 mb-6 border-b pb-2">
            <Plus className="text-indigo-600" /> Add New Product
          </h2>
          {["title", "price", "category", "image"].map((field) => (
            <input
              key={field}
              type={field === "price" ? "number" : "text"}
              name={field}
              placeholder={`Enter ${field}`}
              value={addForm[field]}
              onChange={handleAddChange}
              className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
            />
          ))}
          <button
            onClick={handleAddSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
          >
            <Plus size={18} className="inline-block mr-2" />
            Add Product
          </button>
        </div>

        {/* Edit Product */}
        <div className="bg-white border-2 border-blue-300 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2 mb-6 border-b pb-2">
            <Edit2 className="text-blue-600" /> Edit Product
          </h2>
          {editingId ? (
            <>
              {["title", "price", "category", "image"].map((field) => (
                <input
                  key={field}
                  type={field === "price" ? "number" : "text"}
                  name={field}
                  placeholder={`Edit ${field}`}
                  value={editForm[field]}
                  onChange={handleEditChange}
                  className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                />
              ))}
              <button
                onClick={handleEditSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                <Edit2 size={18} className="inline-block mr-2" />
                Update Product
              </button>
              <button
                onClick={() => {
                  setEditingId(null);
                  setEditForm({
                    title: "",
                    price: "",
                    category: "",
                    image: "",
                  });
                }}
                className="w-full mt-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg"
              >
                Cancel Edit
              </button>
            </>
          ) : (
            <p className="text-gray-600">Select a product below to edit</p>
          )}
        </div>
      </div>

      {/* Product Cards */}
      <div className="bg-white rounded-2xl border-2 border-gray-300 shadow-2xl p-6">
        <h2 className="text-3xl font-bold text-indigo-800 mb-8 border-b pb-2">
          All Products
        </h2>
        {products.length === 0 ? (
          <p className="text-gray-600">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-indigo-50 border border-indigo-200 rounded-xl shadow-md p-4 hover:shadow-lg transition"
              >
                <img
                  src={product.images}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-4 border border-indigo-200"
                />
                <h3 className="text-xl font-bold text-indigo-800">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{product.category}</p>
                <p className="text-green-700 font-bold text-lg mb-4">
                  ₹ {product.price}
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => selectProductToEdit(product)}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { AdminPage };
