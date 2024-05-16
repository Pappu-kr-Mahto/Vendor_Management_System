import React, { useState, useEffect } from 'react';

const AllPurchaseOrders = () => {

    const [purchaseOrders, setPurchaseOrders] = useState('');
    const [modalData, setModalData] = useState("");

    // const [statusPending, setStatusPending] = useState(true);


    const getAllPurchaseOrders = async () => {
        const URL = `${process.env.REACT_APP_API_URL}/api/purchase_orders/`
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`
            }
        });
        const result = await response.json();
        console.log(result)
        setPurchaseOrders(result['success'])
    }
    useEffect(() => {
        getAllPurchaseOrders()
    }, []);

    const handlePurchaseOrderDelete = async (po_number) => {
        const val = window.confirm("Sue you want to delete the ORDER !")
        if (val) {
            const URL = `${process.env.REACT_APP_API_URL}/api/purchase_orders/${po_number}`
            const response = await fetch(URL, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${window.localStorage.getItem('token')}`
                }
            })
            console.log(response)
            const result = await response.json();
            console.log(result)

            if (result['success']) {
                setPurchaseOrders(purchaseOrders.filter((obj) => obj.po_number !== po_number))
            }
            else {
                alert(result['error'])
            }
        }
    }

    return (
        <>
            <h2 className='mt-3'>All Purchase Orders</h2>
            <table className="mt-3 table table-hover table-responsive">
                <thead className='bg-light text-center' >
                <tr>
                    <th>S No</th>
                    <th>Order Code</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        purchaseOrders ?
                            purchaseOrders.map((order, index) => {
                                return (
                                        <tr key={index} className='mb-2'>
                                            <td>{index + 1}</td>
                                            <td>{order.po_number}</td>
                                            <td>{order.order_date}</td>

                                            {
                                                order.status === "pending" ? <td> <button className='btn btn-sm btn-warning'>{order.status}</button></td>
                                                    :
                                                    <>
                                                        {
                                                            order.status === "completed" ? <td ><button className='btn btn-sm btn-success' disabled>{order.status}</button></td> :
                                                                <td><button className='btn btn-sm btn-danger' disabled> {order.status}</button></td>
                                                        }
                                                    </>
                                            }
                                            <td>
                                                <button type="button" className="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setModalData(order)}>View</button>
                                                <button className='btn btn-sm btn-outline-secondary mx-2'>Edit</button>
                                                <button className='btn btn-sm btn-outline-danger' onClick={() => handlePurchaseOrderDelete(order.po_number)}>Delete</button>
                                            </td>
                                        </tr>
                                )
                            })
                            : <tr className='mt-5 text-center'><td className='text-center'> No Purchase Records </td></tr>
                    }
                </tbody>
            </table >

            {/*  Modal for view the Purchase order details */}
            { modalData &&
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Purchase Order ID - {modalData.po_number} </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className="">
                                    <label className="form-label"> Order Date</label><br />
                                    <input value={modalData.order_date} className="form-control" type="text" disabled /><br />
                                </div>
                                <div className="">
                                    <label className="form-label"> vendro</label><br />
                                    <input value={modalData.vendor} className="form-control" type="text" disabled /><br />
                                </div>
                                <div className="">
                                    <label className="form-label"> Status</label><br />
                                    <input value={modalData.status} className="form-control" type="text" disabled /><br />
                                </div>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Item Name</th>
                                            <th> Qunatity </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(modalData.items).map((item, index) =>
                                            <tr key={index}>
                                                <td>{item}</td>
                                                <td>{modalData.items.item}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default AllPurchaseOrders;
