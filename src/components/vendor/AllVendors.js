import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const AllVendors = () => {
    const [allVendors, setAllVendors] = useState("");
    const [modalData, setModalData] = useState("");
    const getAllVendrosDetails = async () => {
        const URL = `${process.env.REACT_APP_API_URL}/api/vendors/`
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`
            }
        });
        const result = await response.json();
        console.log(result)
        setAllVendors(result['success'])
    }
    useEffect(() => {
        getAllVendrosDetails()
    },[]);


    const handleVendorDelete = async (vendor_code) => {
        const val = window.confirm("Sue you want to delete Vendor!")
        if (val) {
            const URL = `${process.env.REACT_APP_API_URL}/api/vendors/${vendor_code}`
            const response = await fetch(URL, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${window.localStorage.getItem('token')}`
                }
            })
            const result = await response.json();
            if (result['success']) {
                    setAllVendors(allVendors.filter((obj)=> obj.vendor_code!==vendor_code))
            }
            else {
                alert(result['error'])
            }
        }
    }
    return (
        <>
            <h2 className='mt-3'>List of All Vendors </h2>
            <table className="mt-3 table table-hover table-responsive">
                <thead className='bg-light text-center' >
                    <th>S No</th>
                    <th >Vendor Code</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Actions</th>
                </thead>
                <tbody className='text-center'>
                    {
                        allVendors ?
                            allVendors.map((vendor, index) => {
                                return (
                                    <>
                                        <tr className='mb-2'>
                                            <td>{index + 1}</td>
                                            <td>{vendor.vendor_code}</td>
                                            <td>{vendor.name}</td>
                                            <td>{vendor.contact_details}</td>
                                            <td>
                                                <button type="button" className="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setModalData(vendor)}>View</button>
                                                <Link to={`/vendors/update/${vendor.vendor_code}`} className='btn btn-sm btn-outline-secondary mx-2'>Edit</Link>
                                                <button className='btn btn-sm btn-outline-danger' onClick={() => handleVendorDelete(vendor.vendor_code)}>Delete</button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                            : <tr className='mt-5 text-center'><td> Add New Vendor </td></tr>
                    }
                </tbody>
            </table >
            
            {/*  Modal  */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Vendor Details | Code- {modalData.vendor_code} </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="">
                                <label className="form-label"> Vendor Name</label><br />
                                <input value={modalData.name} className="form-control" type="text" disabled /><br />
                            </div>
                            <div className="">
                                <label className="form-label"> Address</label><br />
                                <input value={modalData.address} className="form-control" type="text" disabled /><br />
                            </div>
                            <div className="">
                                <label className="form-label"> Contact Details</label><br />
                                <input value={modalData.contact_details} className="form-control" type="text" disabled /><br />
                            </div>
                            <div style={{ display: "flex"}}>
                                <div className='mx-2' style={{ width: "50%" }}>
                                    <label className="form-label"> Average Response Time</label><br />
                                    <input value={modalData.average_response_time} className="form-control" type="text" disabled /><br />
                                </div>
                                <div style={{ width: "50%" }}>
                                    <label className="form-label"> On Time Delivery Rate</label><br />
                                    <input value={modalData.on_time_delivery_rate} className="form-control" type="text" disabled /><br />
                                </div>
                            </div>
                            <div style={{ display: "flex"}} >
                                <div className='mx-2' style={{ width: "50%" }}>
                                    <label className="form-label">Average Quality Rating</label><br />
                                    <input value={modalData.quality_rating_avg} className="form-control" type="text" disabled /><br />
                                </div>
                                <div style={{ width: "50%" }}>
                                    <label className="form-label"> Fulfillment Rate</label><br />
                                    <input value={modalData.fulfillment_rate} className="form-control" type="text" disabled /><br />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllVendors;
