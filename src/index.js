import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import productsReducer from './slices/productsSlice'
import cartReducer from './slices/cartSlice'
import productReducer from './slices/productSlice'
import Shop from './components/shop';
import Cart from './components/cart';
import Header from './components/header';
import Eror from './components/notFound';

import Footer from './components/footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from './components/productDetails';
import Search from './components/search';
import Home from './components/home';
const store = configureStore({
  reducer:{products:productsReducer,cart:cartReducer,product:productReducer}

})

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
   
    <Provider store={store}>
    <BrowserRouter>
    <div className='mainApp'>
    <Header/>
    
    <Routes>
      <Route path='*' element={<Eror/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/filter' element={<Search/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/productDetails/:id' element={<Product/>}/>
      

    </Routes>
    <Footer/>
    </div>
   
    </BrowserRouter>
     
  
    </Provider>
 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
