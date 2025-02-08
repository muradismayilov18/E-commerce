// Favorites.jsx
import { useGetFavoritesQuery, useRemoveFromFavoritesMutation } from '../redux/api/productsApi';
import { toast } from 'react-toastify';

const FavoriteButton = () => {
    const { data: favoriteData } = useGetFavoritesQuery();
    const [removeFromFavorites] = useRemoveFromFavoritesMutation();

    const handleRemoveFromFavorites = async (productId) => {
        try {
            await removeFromFavorites(productId).unwrap();
            toast.success('Məhsul favorilərdən silindi');
        } catch (error) {
            toast.error('Məhsul silinərkən xəta baş verdi');
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {favoriteData?.favorites?.map((product) => (
                <div key={product._id} className="relative border rounded-lg p-4">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-cover mb-2"
                    />
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">{product.price} AZN</p>
                    
                    <button
                        onClick={() => handleRemoveFromFavorites(product._id)}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default FavoriteButton;