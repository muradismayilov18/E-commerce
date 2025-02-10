import React, { useState } from 'react';
import { useAddProductMutation } from "../../redux/api/productsApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/productsApi";

const AddProducts = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);

    try {
      const newImages = await Promise.all(files.map(readFileAsDataURL));
      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    seller: "",
    stock: "",
  });

  const [images, setImages] = useState([]);
  const [addProduct, { isLoading, isError, isSuccess }] = useAddProductMutation();
  const { refetch } = useGetProductsQuery();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    for (let key in formData) {
      form.append(key, formData[key]);
    }

    for (let i = 0; i < images.length; i++) {
      form.append("newImages", images[i]);
    }

    try {
      await addProduct(form).unwrap();
      Swal.fire({
        title: "Uğurla əlavə edildi!",
        text: "Məhsul uğurla əlavə edildi.",
        icon: "success",
        confirmButtonText: "Tamam",
      });

      navigate("/admin/product");

      await refetch();

      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
        seller: "",
        stock: "",
      });

      setImages([]);

    } catch (error) {
      Swal.fire({
        title: "Xəta!",
        text: "Məhsul əlavə edilərkən xəta baş verdi.",
        icon: "error",
        confirmButtonText: "Tamam",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="bg-gradient-to-r from-black via-gray-900 to-black/90 rounded-xl shadow-xl p-8 dark:bg-gray-900">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-pink-500">
            Yeni Məhsul Əlavə Et
          </h2>
          <p className="mt-2 text-gray-300">
            Məhsul məlumatlarını premium şəkildə daxil edin
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Məhsul Adı
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Məhsulun adını daxil edin"
                className="w-full px-6 py-3 rounded-2xl border-2 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white shadow-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Qiymət (₼)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Məs: 29.99"
                className="w-full px-6 py-3 rounded-2xl border-2 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white shadow-xl"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Açıqlama
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Məhsul haqqında ətraflı məlumat..."
                rows="4"
                className="w-full px-6 py-3 rounded-2xl border-2 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white shadow-xl"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Kateqoriya
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-6 py-3 rounded-2xl border-2 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white shadow-xl"
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
                <option value="Kadın">Kadın</option>
                <option value="Erkek">Erkek</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Satıcı
              </label>
              <input
                type="text"
                name="seller"
                value={formData.seller}
                onChange={handleInputChange}
                placeholder="Satıcı məlumatları"
                className="w-full px-6 py-3 rounded-2xl border-2 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white shadow-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stok Ədəd
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="Mövcud stok miqdarı"
                className="w-full px-6 py-3 rounded-2xl border-2 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white shadow-xl"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Şəkil Əlavə Et
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl border-teal-500 hover:border-teal-600 cursor-pointer transition-all bg-gradient-to-r from-teal-100 to-teal-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-teal-500 dark:text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-3h-1v3H9l4 4 4-4h-3z"></path>
                  </svg>
                  <p className="text-sm text-teal-500 dark:text-teal-300 mt-2">Şəkilləri buraya sürükləyin</p>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    multiple
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt={`Selected ${index}`} className="w-full h-32 object-cover rounded-xl shadow-2xl" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-teal-500 text-white rounded-full p-1 hover:bg-teal-600 transition-all"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white text-lg font-semibold rounded-full shadow-xl hover:from-teal-700 hover:to-teal-600 focus:outline-none disabled:opacity-50 transition-all"
            >
              {isLoading ? "Yüklənir..." : "Əlavə Et"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
