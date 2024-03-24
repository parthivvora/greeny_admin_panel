import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Banners from './pages/Banners';
import Categories from './pages/Categories';
import Products from './pages/Products';
import Brands from './pages/Brands';
import User from './pages/User';
import Orders from './pages/Orders';
import Payment from './pages/Payment';

function App() {
  const adminToken = sessionStorage.getItem('adminToken');
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {
            adminToken ? (
              <>
                <Route path='/' element={<Home />} />
                <Route path='/banners' element={<Banners />} />
                <Route path='/categories' element={<Categories />} />
                <Route path='/products' element={<Products />} />
                <Route path='/brands' element={<Brands />} />
                <Route path='/user' element={<User />} />
                <Route path='/order' element={<Orders />} />
                <Route path='/payment' element={<Payment />} />
              </>
            ) : (
              <Route path='/' element={<Login />} />
            )
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
