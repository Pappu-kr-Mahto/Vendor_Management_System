import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Formik, Field, FieldArray, Form } from 'formik';
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

const UpdatePurchaseOrder = () => {
    const { po_number } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState({vendor:"", quantity:0, items:[],order_date:""});

    const [allVendor, setallVendor] = useState([]);

    const getAllVendrosDetails = async () => {
        const URL = `${process.env.REACT_APP_API_URL}/api/vendors/`
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`
            }
        });
        const result = await response.json();
        setallVendor(result['success'])
    }
    const getPurchaseOrderDetails = async () => {
        const URL = `${process.env.REACT_APP_API_URL}/api/purchase_orders/${po_number}`
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`
            },
        });
        const result = await response.json();
        if (result['success']) {
            const itemdata = result['success']['items']
            const itemlist=[]
            for(let i in itemdata){
                itemlist.push({name:i,quantity:itemdata[i]})
            }
            setOrder({vendor:result['success']['vendor'], quantity:result['success']['quantity'], items:itemlist , order_date:result['success']['order_date']})
        }
    }

    useEffect(() => {
        getPurchaseOrderDetails()
        getAllVendrosDetails()
    }, []);
    

    const updatePurchaseOrder= async (data)=>{
        delete data.order_date
        const URL = `${process.env.REACT_APP_API_URL}/api/purchase_orders/${po_number}/`
        const response = await fetch(URL, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`
            },
            body:JSON.stringify(data),
        });
        const result = await response.json();
        if (result['success']) {
            navigate("/purchaseorders")
        }
        else{
            alert("Something went Wrong! Please try again.")
        }
    }
    return (
        <>
            <div>
                <h2 className='my-4'> Updated Purchase Order</h2>
                <div className='col-8 m-auto p-4' style={{ border: "1px solid gray" }}>
                    <Formik
                        enableReinitialize={true}
                        initialValues={order}
                        onSubmit={(values) => {
                            if (values.items.length === 0) {
                                alert("Add atleast 1 item  to proceed.")
                            }
                            else {
                                const data = { items: {}, quantity: 0 };
                                values.items.map((item) => {
                                    if (item.name in data.items) {
                                        alert("Remove the Duplicate items from list")
                                    }
                                    else {
                                        data.items[item.name] = item.quantity
                                        data.quantity += item.quantity
                                    }
                                })
                                values.items=data.items;
                                values.quantity=data.quantity;
                                const val = window.confirm("Sure you want to place order!")
                                if (val) {
                                    updatePurchaseOrder(values)
                                }
                            }

                        }}
                    >
                        {({ values }) => (
                            <Form>
                                <div>
                                    <label htmlFor="name" className='mb-2'> <b>  Order ID - {po_number} </b> </label>
                                    <span style={{float:"right"}}><small>{values.order_date}</small> </span>
                                </div>

                                {
                                    values &&
                                    <FieldArray
                                    name="items"
                                    render={arrayHelpers => (
                                        <div className="mb-1 border">
                                            <table className='table table-borderless'>
                                                <thead>
                                                    <tr>
                                                        <th style={{ display: "flex" }} className='px-4 bg-light'><span style={{ width: "70%" }}>Item Name</span> <span>Quantity</span></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        values.items.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <div className='text-end' style={{ position: 'relative' }}>
                                                                            <span onClick={() => arrayHelpers.remove(index)} style={{ position: 'absolute', zIndex: 1, margin: '-1rem 0 0 -1rem' }}> <RxCrossCircled /></span>
                                                                        </div>
                                                                        <div style={{ display: "flex" }}>
                                                                            <Field name={`items[${index}].name`} value={values.items[index].name} className="form-control mx-2" type="text" style={{ width: "65%", display: "inline-block" }} required />
                                                                            <Field name={`items[${index}].quantity`} type="number" min={1} className="form-control" style={{ width: "30%" }} required />
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }

                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td>
                                                            <div className='text-end'><button type='button' className='btn btn-success btn-sm' onClick={() => arrayHelpers.push({ name: "", quantity: "" })}> + Add Items</button></div>
                                                            <label htmlFor="quantity" className="form-label" >Total Quantity –  {values.items.reduce((total, item) => total + item.quantity, 0)} </label>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    )}
                                >
                                    </FieldArray>
                                }
                                
                                <div className="mb-1">
                                    <label className="form-label"> Select Vendor </label><br />
                                    <Field name="vendor" as="select" className="form-control mb-4" required >
                                        <option value=""> -- Select --</option>
                                        {
                                            allVendor.map((vendor, index) => <option key={index} value={vendor.vendor_code}>{vendor.name} —  {vendor.vendor_code}</option>
                                            )
                                        }
                                    </Field>

                                </div>
                                <div className="my-2 text-center">
                                    <Link to="/purchaseorders"  className="btn btn-secondary mx-2" >Cancel</Link>
                                    <button  type="submit" className="btn btn-success mx-2" >Update</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
}

export default UpdatePurchaseOrder;
