import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Spinner } from 'react-bootstrap';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import LandingPage from './Component/LandingPage';
import { Suspense, lazy, useState } from 'react';
import './Component/Style.css'
import './Shoping/shopping.css'
import ProductPage from './Shoping/ProductPage';
import DesignerPage from './DesingEdit/DesignerPage';
import Myaccount from './Component/Myaccount';
import AdminLogin from './Admin/Pages/AdminLogin';
import Adminpannel from './Admin/Pages/Adminpannel';

// Host name
export const hostname="http://localhost:3020"
function App() {
  let [user,setuser]=useState({})
 
  let Landing=lazy(()=>import('./Component/LandingPage'))
  let Shopping=lazy(()=>import('./Shoping/Shop'))

  return (
<div>
  <BrowserRouter>
  <Suspense fallback={
            <div className="flex mx-auto w-fit h-[100vh] my-auto align-items-center">
              <Spinner animation="border"/>
            </div>}>
      <Routes>
        <Route path='/*' element={<Landing />}/>
        <Route path='/shop' element={<Shopping />}/>
        <Route path='/shop/:name' element={<ProductPage />}/>
        <Route path='/design/:type' element={<DesignerPage />}/>
        <Route path='/myaccount' element={<Myaccount />}/>
        {/* Admin pannel sub page */}
        <Route path='/admin/*' element={<Adminpannel/>}/>
      </Routes>
      </Suspense>
  </BrowserRouter>
  
  
</div>
  );
}

export default App;
