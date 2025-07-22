import { Navbar } from "../components/Navbar";
import useAppContext from "../contexts/useAppContext";
import { useNavigate } from "react-router";

const CartPage = () => {
  const { cartItems, setCartItems, setCount } = useAppContext();
  const navigate = useNavigate();

  const handleOrder = () => {
    setCartItems([]);
    setCount(0);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartCount");
    navigate("/order-success");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-8 border-b pb-2">
          🛒 Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            <p>Your cart is currently empty.</p>
            <p className="text-sm mt-2">Start shopping to add items!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {cartItems.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
                >
                  <img
                src={product.images}
                alt={product.title}
                className="w-full h-40 object-cover rounded"
              />
                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">
                      {product.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">
                      {product.category || "Uncategorized"}
                    </p>
                    <p className="text-xl font-bold text-green-600 mt-auto">
                      ₹ {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Button */}
            <div className="flex justify-end">
              <button
                onClick={handleOrder}
                className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-xl shadow-md transition-all"
              >
                Order Now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { CartPage };
