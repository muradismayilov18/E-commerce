import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/productsApi"; // Redux Toolkit sorğusu
import ChartComponent from "./ChartComponent";

const AdminProducts = () => {
  // Redux sorğusu ilə məhsulları əldə etmək
  const { data, error, isLoading } = useGetProductsQuery();

  // Fake Chart məlumatı
  const products = data?.products?.map((product) => product.name) || [];
  //0-1 0.45435 0.325325
  const sales = data?.products?.map(() => Math.round(Math.random() * 200) + 50) || [];


  const navigate = useNavigate()
  //skeleton loading ui
  if (isLoading) {
    return <div className="text-center text-xl mt-10">Yüklənir...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl mt-10">Xəta baş verdi: {error.message}</div>;
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
          <h2 className="text-3xl font-semibold mb-5 text-center text-gray-800">
            Məhsullar Siyahısı
          </h2>
          <table className="table-auto w-full border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-600">
                <th className="border px-6 py-4 text-left text-sm font-medium text-white">Ad</th>
                <th className="border px-6 py-4 text-left text-sm font-medium text-white">Qiymət</th>
                <th className="border px-6 py-4 text-left text-sm font-medium text-white">Kateqoriya</th>
                <th className="border px-6 py-4 text-left text-sm font-medium text-white">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition duration-200 ease-in-out transform hover:scale-105"
                >
                  <td className="border px-6 py-4 text-sm text-gray-700 font-medium">{product.name}</td>
                  <td className="border px-6 py-4 text-sm text-gray-700 font-medium">{product.price}</td>
                  <td className="border px-6 py-4 text-sm text-gray-700 font-medium">{product.category}</td>
                  <td className="border px-6 py-4 space-x-4">
                    <div className="flex gap-4"> {/* Buttonlar arasında 1rem (16px) boşluq yaradır */}
                      <button
                        className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 rounded-md hover:from-blue-500 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
                        onClick={() => handleEdit(product._id)}
                      >
                        Redaktə Et
                      </button>
                      <button
                        className="bg-gradient-to-r from-red-400 to-red-500 text-white px-4 py-2 rounded-md hover:from-red-500 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
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
