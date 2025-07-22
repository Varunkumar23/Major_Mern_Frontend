import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast } from "../utils/toastHelper";
import useAppContext from "../contexts/useAppContext";
import { AppContext } from "../contexts/appContext";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const { setCount, cartItems, setCartItems, searchQuery } = useAppContext();

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");
      const result = response.data;

      if (result.isSuccess) {
        setProducts(result.data.products);
      } else {
        ErrorToast("Failed to load products");
      }
    } catch (err) {
      console.log(err.message);
      ErrorToast(`Error: ${err.message}`);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title &&
      product.title.toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Browse Products</h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
            >
              <img
                src={product.images}
                alt={product.title}
                className="w-full h-40 object-cover rounded"
              />

              <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-sm text-gray-500">Brand: {product.brand}</p>
              <p className="text-sm text-gray-500">Ratings: {product.rating}</p>
              <p className="text-green-700 font-bold mt-1">₹ {product.price}</p>
              <button
                className="mt-3 bg-green-600 text-white px-4 py-1 rounded"
                onClick={() => {
                  if (!cartItems.find((item) => item._id === product._id)) {
                    setCartItems([...cartItems, product]);
                    setCount((prev) => prev + 1);
                  } else {
                    alert("Product is already in the cart");
                  }
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { HomePage };
