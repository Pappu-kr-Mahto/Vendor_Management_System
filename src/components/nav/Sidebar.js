import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
    const {loginStatus } = props

    const [showVendorMenu, setshowVendorMenu] = useState(false);
    const [showPurchaseMenu, setshowPurchaseMenu] = useState(false);


    return (
        <>
            {loginStatus &&
                <div className="col-3" style={{minHeight:'80vh',backgroundColor:"#e3f2fd",borderRight:"1px solid gray"}}>
                    <div className="row mt-3" >
                        <div className="d-flex flex-column">
                            <div className="nav flex-column me-3" aria-orientation="vertical">
                                <Link to="/home" className="btn nav-link" >Home</Link>
                                <div className="btn nav-link"  onClick={() => setshowVendorMenu(!showVendorMenu)}>Vendor</div>
                                {showVendorMenu && <div className='py-3 bg-light text-center'>
                                    <Link to="/vendors/add/" className='mb-2 btn btn-outline-secondary'>Add Vendor</Link><br />
                                    <Link to="/vendors" className='mb-2 btn btn-outline-secondary'>All Vendors</Link> 
                                </div>}
                                <div className="btn nav-link"  onClick={() => setshowPurchaseMenu(!showPurchaseMenu)}>Purchase Order</div>
                                {showPurchaseMenu && <div className='py-3 bg-light text-center'>
                                    <Link to="/purchaseorders/add" className='mb-2 btn btn-outline-secondary'>Create Order</Link> <br/>
                                    <Link to="/purchaseorders/acknowledge" className='mb-2 btn btn-outline-secondary'>Acknowledge Order</Link><br/>
                                    <Link to="/purchaseorders" className='mb-2 btn btn-outline-secondary'>List of All Purchase Orders</Link><br/>
                                </div>}
                                <Link to="" className="btn nav-link" >Performance Matrix</Link>
                            </div>
                        </div>
                    </div>

                </div>
            }
        </>
    );
}

export default Sidebar;
