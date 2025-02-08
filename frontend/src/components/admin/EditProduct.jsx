import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/api/productsApi";
import Swal from "sweetalert2";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetProductDetailsQuery(id);


  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    seller: "",
    stock: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.product.name,
        price: data.product.price,
        description: data.product.description,
        category: data.product.category,
        seller: data.product.seller,
        stock: data.product.stock,
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulated API request for update
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Replace with actual update API call

      Swal.fire("Uğurlu!", "Məhsul uğurla yeniləndi!", "success");
      navigate("/admin/product");
    } catch (err) {
      Swal.fire("Xəta!", "Məhsul yenilənmədi!", "error");
    }
  };

  if (isLoading) return <div>Yüklənir...</div>;
  if (error) return <div>Xəta baş verdi: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Məhsulu Redaktə Et</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Ad"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Qiymət"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Açıqlama"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        ></textarea>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="">Kateqoriya Seç</option>
          <option value="Electronics">Electronics</option>
          <option value="Cameras">Cameras</option>
          <option value="Laptops">Laptops</option>
          <option value="Accessories">Accessories</option>
          <option value="Headphones">Headphones</option>
          <option value="Food">Food</option>
          <option value="Books">Books</option>
          <option value="Sports">Sports</option>
          <option value="Outdoor">Outdoor</option>
          <option value="Home">Home</option>
        </select>
        <input
          type="text"
          name="seller"
          value={formData.seller}
          onChange={handleInputChange}
          placeholder="Satıcı"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
          placeholder="Stok"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Yenilə
        </button>
      </form>
    </div>
  );
};

export default EditProduct;