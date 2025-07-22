import { Link } from "react-router";

const OrderSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-white flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-3xl p-10 text-center max-w-md w-full border border-green-200 animate-fade-in-down">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-green-700 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for shopping with us. Your items will be delivered soon. 🚚
        </p>

        <Link
          to="/"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-full transition-all shadow-md"
        >
          🏠 Back to Home
        </Link>
      </div>

      <p className="mt-8 text-sm text-gray-400">
        Need help? Contact support anytime.
      </p>
    </div>
  );
};

export { OrderSuccessPage };
