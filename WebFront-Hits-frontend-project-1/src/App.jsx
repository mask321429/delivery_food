import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import OrderHistory from './pages/OrderHistory.jsx';
import OrderDetails from './pages/OrderDetails.jsx';
import Register from './pages/register.jsx';
import Login from './pages/login.jsx';
import HomeWithLog from './pages/homeWithLog.jsx';
import Profile from './pages/profile.jsx';
import MenuItemDetail from './pages/MenuItemDetail.jsx';
import Cart from './pages/cart.jsx';
import Purchase from './pages/purchase.jsx';
class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/registration/" element={<Register />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/orders/" element={<OrderHistory />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/" element={<HomeWithLog />} />

          <Route path="/profile/" element={<Profile />} />
          <Route path="/item/:id" element={<MenuItemDetail />} />
          <Route path="/cart/" element={<Cart />} />
          <Route path="/purchase" element={<Purchase />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
