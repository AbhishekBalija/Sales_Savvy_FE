import { useOrders } from "../hooks/useOrders";

const Orders = () => {
  const { orders, loading, error } = useOrders();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-600 text-lg font-medium">Error: {error}</p>
      </div>
    );
  }

  if (!orders?.products?.length) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-gray-700">
        <h1 className="text-3xl font-semibold mb-2">No Orders Found</h1>
        <p className="text-gray-500">You haven&apos;t placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl bg-purple-100">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Your Orders</h1>
      <div className="space-y-6">
        {orders.products.map((product) => (
          <div
            key={`${product.order_id}-${product.product_id}`}
            className="bg-white rounded-xl shadow-lg p-5 flex gap-5 items-center transition hover:shadow-xl"
          >
            <div className="w-24 h-24 flex-shrink-0">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-medium text-gray-900">
                  {product.name}
                </h2>
                <span className="text-green-600 font-semibold text-lg">
                  ₹{product.total_price.toFixed(2)}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">
                {product.description}
              </p>
              <div className="flex justify-between text-sm text-gray-500">
                <p>Quantity: {product.quantity}</p>
                <p>₹{product.price_per_unit.toFixed(2)} per unit</p>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Order ID: {product.order_id}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
