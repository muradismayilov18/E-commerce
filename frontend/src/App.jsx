// import 'bootstrap/dist/css/bootstrap.min.css' 
import './App.css'
import "flowbite"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'
import Register from './components/Register'
import { Toaster } from 'react-hot-toast'
import ProductDetail from './components/ProductDetail'
import AddProducts from './components/admin/AddProducts'
import AdminProducts from './components/admin/AdminProduct'
import EditProduct from './components/admin/EditProduct'
import SearchResults from './components/SearchResults'
import NotFound from './pages/NotFound'
import Introduction from './components/Introduction'
import SebetCart from './components/SebetCart'
import Categories from './components/Categories'
import Footer from './components/Footer'
import Kadın from './pages/Kadın'
import FavoriteButton from './components/FavoriteButton'


function App() {
  return (
    <>
    <BrowserRouter>
    <Toaster position='top-center'/>
    <Navbar/>
    <Routes>
    <Route path="/search-results" element={<SearchResults />} />
      <Route path="/home" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/product/:id" element={<ProductDetail/>}/>
      <Route path="/admin/products" element={<AddProducts/>}/>
      <Route path="/admin/product" element={<AdminProducts/>}/>
      <Route path="/admin/editproduct/:id" element={<EditProduct/>}/>
      <Route path="/404" element={<NotFound/>} />
      <Route path="/" element={<Introduction/>} />
      <Route path="/cartsebet" element={<SebetCart/>} />
      <Route path="/catoria" element={<Categories/>} />
      <Route path="/cart" element={<SebetCart/>} />
      <Route path="/kadin" element={<Kadın/>} />
      <Route path="/favori" element={<FavoriteButton/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
