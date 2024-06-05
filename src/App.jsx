import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Payment from './components/Payment';
import { Thanks } from './components/Thanks';
import MyForm from './components/Form';
import Homepage from './components/HomePage';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/payment-page' element={<Payment />} />
        <Route path='/' element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
