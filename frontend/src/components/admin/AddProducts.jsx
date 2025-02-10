import React, {useState} from 'react'
import { useAddProductMutation } from "../../redux/api/productsApi";
import Swal from "sweetalert2"; // SweetAlert2 importu
import { useNavigate } from "react-router-dom"; // useNavigate importu
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
    const files = Array.from(event.target.files); // FileList-i array-ə çeviririk

    try {
      const newImages = await Promise.all(files.map(readFileAsDataURL));

      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    } catch (error) {
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
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 dark:bg-gray-800/90">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Yeni Məhsul Əlavə Et
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-300">
            Məhsul məlumatlarını diqqətlə doldurun
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Input Qrupları */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Məhsul Adı
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
            onChange={handleInputChange}
                placeholder="Məhsulun adını daxil edin"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Qiymət (₼)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Məs: 29.99"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Açıqlama
              </label>
              <textarea
                name="description"
                value={formData.description}
            onChange={handleInputChange}
                placeholder="Məhsul haqqında ətraflı məlumat..."
                rows="4"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Kateqoriya
              </label>
              <select
                name="category"
                value={formData.category}
            onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNy40MSA4LjU5TDEyIDEzLjE3bDQuNTktNC41OEwxOCAxMGwtNiA2LTYtNiAxLjQxLTEuNDF6Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                <option value="Home">Kadın</option>
                <option value="Home">Erkek</option>
                {/* Kateqoriya seçimləri */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Satıcı
              </label>
              <input
                type="text"
                name="seller"
                value={formData.seller}
            onChange={handleInputChange}
                placeholder="Satıcı məlumatları"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Stok Ədəd
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
            onChange={handleInputChange}
                placeholder="Mövcud stok miqdarı"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Fayl Yükləmə */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Şəkil Əlavə Et
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-4 border-dashed hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all rounded-lg cursor-pointer">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="pt-1 text-sm text-gray-500">
                      Şəkilləri sürükləyin və ya <span className="text-blue-600">seçin</span>
                    </p>
                  </div>
                  <input
                    type="file"
                    name="newImages"
                    multiple
                    onChange={handleFileChange}
                    className="opacity-0"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Təsdiq Düyməsi */}
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg"
          >
            Məhsulu Yarat
          </button>
        </form>

        {/* Seçilmiş Şəkillər */}
        {selectedImages.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Seçilmiş Şəkillər ({selectedImages.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Selected ${index}`}
                    className="w-full h-32 object-cover rounded-lg shadow-md group-hover:opacity-75 transition-all"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-all shadow-lg"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProducts;