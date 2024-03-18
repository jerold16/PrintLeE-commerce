
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminLogin from './Pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Pages/Dashboard';
import Protect from './Pages/Protect';
import Product from './Pages/Product';
import CreateBrand from './Pages/CreateBrand';
import CreateCategory from './Pages/CreateCategory';



export const hostName='http://localhost:3020'
function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Protect Child={Dashboard}/>}/>
          <Route path='/product/*' element={<Protect Child={Product}/>}/>
          <Route path='/createBrand' element={<Protect Child={CreateBrand}/>}/>
          <Route path='/createCategory' element={<Protect Child={CreateCategory}/>}/>
          <Route />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
