import { useState, useEffect } from "react";
import axios from "axios";
import { TeaContext } from "../context/TeaContext";

const Teaproducts = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please ensure the backend is running.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div>
        <TeaContext.Provider value={{ data, loading, error }}>
          {children}
        </TeaContext.Provider>
      </div>
    </>
  );
};

export default Teaproducts;
