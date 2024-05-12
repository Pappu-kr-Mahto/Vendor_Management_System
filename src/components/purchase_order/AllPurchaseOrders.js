import React, { useState, useEffect } from 'react';

const AllPurchaseOrders = () => {

    const [purchaseOrders, setPurchaseOrders] = useState('');

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

    return (
        <>
            <h2 className='mt-3'>All Purchase Orders</h2>
            <table className="mt-3 table table-hover table-responsive">
                <thead className='bg-light text-center' >
                    <th>S No</th>
                    <th >Order Code</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </thead>
                <tbody className='text-center'>
                    {
                        purchaseOrders ?
                            purchaseOrders.map((order, index) => {
                                return (
                                    <>
                                        <tr className='mb-2'>
                                            <td>{index + 1}</td>
                                            <td>{order.po_number}</td>
                                            <td>{order.order_date}</td>
                                            <td>{order.status}</td>
                                            <td>
                                                <button className='btn btn-sm btn-outline-primary'>View</button>
                                                <button className='btn btn-sm btn-outline-secondary mx-2'>Edit</button>
                                                <button className='btn btn-sm btn-outline-danger'>Delete</button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                            : <tr className='mt-5 text-center'><td> No Purchase Records </td></tr>
                    }
                </tbody>
            </table >
        </>
    );
}

export default AllPurchaseOrders;
