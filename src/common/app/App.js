// Application stylesheet
import './App.css';
// React router components
import { Routes, Route, Link, NavLink } from 'react-router-dom';
// Routes
import Home from '../../routes/home/Home';
import Products from '../../routes/products/Products';
import Deliveries from '../../routes/deliveries/Deliveries';
import ErrorPage from "../../routes/error/ErrorPage";

export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="deliveries" element={<Deliveries />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
