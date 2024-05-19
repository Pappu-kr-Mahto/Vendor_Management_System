import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik'
import { useNavigate } from 'react-router-dom';
const AcknowledgeOrder = () => {

    const [purchaseOrders, setPurchaseOrders] = useState('');
    const [searchId, setSearchId] = useState('');
    const [expDate, setexpDate] = useState({ 'expected_delivery_date': '' });
    const [modalData, setModalData] = useState({ po_number: "", items: {}, order_date: "", vendor: "", status: "" });
    const [refresh, setrefresh] = useState(false);

    const getAllPurchaseOrders = async () => {
        const URL = `${process.env.REACT_APP_API_URL}/api/purchase_orders/`
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`
            }
        });
        const result = await response.json();
        // console.log(result)
        const data = result['success'].filter((order) => order.acknowledgement_date === null)
        setPurchaseOrders(data)
    }

    useEffect(() => {
        getAllPurchaseOrders()
    }, [refresh]);

    const handleSearchOrder = () => {
        console.log(searchId)
        if (searchId) {
            setPurchaseOrders(purchaseOrders.filter((order) => order.po_number === searchId))
        }
        else {
            getAllPurchaseOrders()
        }
        console.log(purchaseOrders)
    }

    const handleAcknowldegeSubmit = async (values) => {
        console.log(values)
        const URL = `${process.env.REACT_APP_API_URL}/api/purchase_orders/${modalData.po_number}/acknowledge/`
            const response = await fetch(URL,{
                    method:"POST",
                    headers:{
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${window.localStorage.getItem('token')}` 
                    },
                    body:JSON.stringify(values), 
                });
                
                const result = await response.json();
                // console.log(result)
                if(result['success']){
                    alert("Order Acknowledged successfully")
                    setrefresh(!refresh)
                }
                else{
                    alert("Something went wrong !Try Again.")
                }
    }

    return (
        <>
            <h2 className='my-4'> Acknowledge Purchase Orders </h2>
            <div className=' m-auto p-4' >
                <div className="mb-1 px-5">
                    <label htmlFor="orderID" className="form-label"> <b>Enter Order ID</b></label>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            min="1"
                            placeholder="Enter order id "
                            id="orderID"
                            aria-describedby="button-addon2"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            required
                        />
                        <button
                            className="btn btn-primary px-3"
                            type="button"
                            id="button-addon2"
                            onClick={handleSearchOrder}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <table className="mt-3 table table-hover table-responsive">
                <thead className='bg-light text-center' >
                    <tr>
                        <th>S No</th>
                        <th>Order Code</th>
                        <th>Order Date</th>
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
                                        <td>
                                            <button type="button" className="btn btn-sm btn-outline-primary mx-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setModalData(order)}>View</button>
                                            <button className='btn btn-sm btn-outline-danger mx-1' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setModalData(order)} >Acknowledge</button>
                                        </td>
                                    </tr>
                                )
                            })
                            : <tr className='mt-5 text-center'><td colSpan={4} className='text-center'> {searchId ? <>No Purchase Records</> : <>Records Not found for perticular ID</>} </td></tr>
                    }
                </tbody>
            </table >

            {/*  Modal for view the Purchase order details */}
            {Object.keys(modalData).length > 1 &&
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
                                    <label className="form-label"> vendor Code</label><br />
                                    <input value={modalData.vendor} className="form-control" type="text" disabled /><br />
                                </div>
                                <div className="">
                                    <label className="form-label"> Status</label><br />
                                    <input value={modalData.status} className="form-control" type="text" disabled /><br />
                                </div>
                                <table style={{ width: "50%" }} className='table m-auto' >
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
                                                <td>{modalData.items[`${item}`]}</td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                                <div className='mt-3 text-center' style={{ display: "flex", flexWrap: "wrap", columnGap: 50 }}>
                                    {modalData.acknowledgement_date &&
                                        <div>
                                            <label className="form-label">Acknowledge Date</label><br />
                                            <input value={modalData.acknowledgement_date} className="form-control" type="text" disabled /><br />
                                        </div>}
                                    {modalData.expected_delivery_date && <div>
                                        <label className="form-label"> Expected Delivery Date</label><br />
                                        <input value={modalData.expected_delivery_date} className="form-control" type="text" disabled /><br />
                                    </div>}
                                    {modalData.delivery_date && <div>
                                        <label className="form-label">Delivery Date</label><br />
                                        <input value={modalData.delivery_date} className="form-control" type="text" disabled /><br />
                                    </div>}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {/*  Modal for Acknowledge Purchase order*/}

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">                <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title" id="exampleModalLabel"> <b>Purchase Order ID - {modalData.po_number}</b> <br />  <small>{modalData.order_date}</small> </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <Formik
                            enableReinitialize={true}
                            initialValues={expDate}

                            onSubmit={(values) => {
                                const val = window.confirm("Sure Confirm the Expected Delivery Date")
                                if (val) {
                                    handleAcknowldegeSubmit(values)
                                }
                            }}
                        >

                            <Form>
                                <div className="modal-body">
                                    <div className="">
                                        <label className="form-label"> Enter Expected Date of Delivery</label><br />
                                        <Field name="expected_delivery_date" className="form-control" type='datetime-local' required /><br />
                                    </div>
                                </div>
                                <div className="modal-footer m-auto">
                                    <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-success" data-bs-dismiss="modal" >Acknowledge</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AcknowledgeOrder;
