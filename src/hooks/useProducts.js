import { useState, useEffect } from "react";

const useProducts = (category) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(`http://localhost:8080/api/products?category=${category}`, {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("401 Unauthorized");
          } else {
            throw new Error("Failed to fetch products");
          }
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return { products, loading, error };
};

export default useProducts;