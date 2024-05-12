import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Home from '../home/Home';
import AllVendors from '../vendor/AllVendors';
import AddVendor from '../vendor/AddVendor';
import AllPurchaseOrders from '../purchase_order/AllPurchaseOrders';
import CreatePurchaseOrder from '../purchase_order/CreatePurchaseOrder';
import UpdateVendor from '../vendor/UpdateVendor';
const AppRoutes = (props) => {
    const {loginStatus, setLoginStatus } = props 
  return (
    <>
      <Routes>
            <Route exact path ='/' element={<Login loginStatus={loginStatus} setLoginStatus= {setLoginStatus} />} />
            <Route exact path ='/register' element={<Register/>} />
            <Route exact path ='/login' element={<Login setLoginStatus= {setLoginStatus}/>} />
            <Route exact path ='/home' element={<Home/>} />
            <Route exact path ='/vendors' element={<AllVendors/>} />
            <Route exact path ='/vendors/add' element={<AddVendor/>} />
            <Route exact path ='/vendors/update/:vendor_code' element={<UpdateVendor/>} />
            <Route exact path ='/purchaseorders' element={<AllPurchaseOrders/>} />
            <Route exact path ='/purchaseorders/add' element={<CreatePurchaseOrder/>} />
      </Routes>
    </>
  );
}

export default AppRoutes;
