/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";

const DeleteProductModal = ({ isOpen, onClose }) => {
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:8080/admin/products/delete",
        {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ productId: parseInt(productId) }),
        }
      );

      if (!response.ok) throw new Error("Failed to delete product");
      toast.success("Product deleted successfully");

      onClose();
      setProductId("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Product">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Product ID
          </label>
          <input
            type="number"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
            required
          />
        </div>

        {error && <div className="text-red-400 text-sm">{error}</div>}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete Product"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteProductModal;
