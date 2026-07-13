// App.jsx — Root app with router and providers

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage      from './pages/Home';
import CatalogPage   from './pages/Catalog';
import GameDetailPage from './pages/GameDetail';
import AccountPage   from './pages/Account';
import CartPage      from './pages/Cart';
import CheckoutPage  from './pages/Checkout';
import NotFoundPage  from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-bg-deep text-text-primary font-body">
          <Navbar />
          <Routes>
            <Route path="/"          element={<HomePage />} />
            <Route path="/catalog"   element={<CatalogPage />} />
            <Route path="/game/:id"  element={<GameDetailPage />} />
            <Route path="/account"   element={<AccountPage />} />
            <Route path="/cart"      element={<CartPage />} />
            <Route path="/checkout"  element={<CheckoutPage />} />
            <Route path="*"          element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
