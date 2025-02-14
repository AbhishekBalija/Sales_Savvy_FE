/* eslint-disable react/prop-types */
import useCart from "../hooks/useCart";

const ProductCard = ({ product }) => {
  const { addCartItem, refreshCart } = useCart();

  const handleAddToCart = async () => {
    await addCartItem(product.product_id, 1); // Add the product with a quantity of 1
    refreshCart(); // Refresh the cart to update the count
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-800">
            ₹{product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
