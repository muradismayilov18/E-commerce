import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/productsApi"; // Redux Toolkit sorğusu
import ChartComponent from "./ChartComponent";

const AdminProducts = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  const products = data?.products?.map((product) => product.name) || [];
  const sales = data?.products?.map(() => Math.round(Math.random() * 200) + 50) || [];
  
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="text-center text-2xl mt-10 text-gray-500">Yüklənir...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-2xl mt-10">Xəta baş verdi: {error.message}</div>;
  }

  const handleEdit = (id) => {
    navigate(`/admin/editproduct/${id}`);
  };

  return (
    <>
      <ChartComponent
        title="Mehsul satis qrafiki"
        labels={products}
        dataPoints={sales}
      />
      <div className="flex justify-center items-start flex-wrap mt-10 gap-10 px-4">
        <div className="w-full lg:w-3/4 xl:w-2/3">
          <h2 className="text-5xl font-semibold mb-8 text-center text-gray-900 tracking-wide leading-tight">
            Məhsullar Siyahısı
          </h2>
          <table className="table-auto w-full border border-gray-300 rounded-3xl shadow-2xl overflow-hidden bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-xl">
                <th className="border px-6 py-4 text-left text-sm font-semibold text-white">Ad</th>
                <th className="border px-6 py-4 text-left text-sm font-semibold text-white">Qiymət</th>
                <th className="border px-6 py-4 text-left text-sm font-semibold text-white">Kateqoriya</th>
                <th className="border px-6 py-4 text-left text-sm font-semibold text-white">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <td className="border px-6 py-4 text-lg text-gray-700 font-medium">{product.name}</td>
                  <td className="border px-6 py-4 text-lg text-gray-700 font-medium">{product.price} AZN</td>
                  <td className="border px-6 py-4 text-lg text-gray-700 font-medium">{product.category}</td>
                  <td className="border px-6 py-4 space-x-4">
                    <div className="flex gap-6">
                      <button
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-5 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-2xl transform hover:scale-110 hover:shadow-lg"
                        onClick={() => handleEdit(product._id)}
                      >
                        Redaktə Et
                      </button>
                      <button
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-5 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-2xl transform hover:scale-110 hover:shadow-lg"
                      >
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
