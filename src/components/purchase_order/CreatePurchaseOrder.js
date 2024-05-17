import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik'
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

const CreatePurchaseOrder = () => {
  const navigate = useNavigate()

  const [allVendor, setAllVendors] = useState([]);
  const [items, setItems] = useState([{ name: '', quantity: '' }]);

  const getAllVendrosDetails = async () => {
    const URL = `${process.env.REACT_APP_API_URL}/api/vendors/`
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`
      }
    });
    const result = await response.json();
    setAllVendors(result['success'])
  }
  const CreatePurchaseOrder = async (data) => {
    const URL = `${process.env.REACT_APP_API_URL}/api/purchase_orders/`
    const response = await fetch(URL, {
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`
        },
        body:JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result)
    if(result['success']){
      alert("Order Placed successfully")
      navigate('/purchaseorders')
    }
  }

  
  useEffect(() => {
    getAllVendrosDetails()
  }, []);
  return (
    <div>
      <h2 className='my-4'>Create Purchase Orders</h2>
      <div className='col-8 m-auto p-4' style={{ border: "1px solid gray" }}>
        <Formik
          enableReinitialize={true}
          initialValues={{ 'items': items, 'vendor': '' }}
          onSubmit={(values) => {
            if (values.items.length === 0) {
              alert("Add atleast 1 item to proceed.")
            }
            const data = { items: {}, quantity: 0, vendor: "" };
            values.items.map((item) => {
              if (item.name in data.items) {
                alert("Remove the Duplicate items from list")
              }
              else {
                data.items[item.name] = item.quantity
                data.quantity += item.quantity
              }
            })
            data.vendor = values.vendor

            const val=window.confirm("Sure you want to place order!")
            if(val){
              CreatePurchaseOrder(data)
            }
          }}
        >
          {({ values }) => (
            <Form>
              <label htmlFor="name" className='mb-2'> <b> <u> Enter Items Details</u> </b></label><br />
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
                                    <Field name={`items[${index}].name`} className="form-control mx-2" type="text" style={{ width: "65%", display: "inline-block" }} required />
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

              <div className="mb-1">
                <label className="form-label"> Select Vendor </label><br />
                <Field name="vendor" as="select" className="form-control mb-4" required >
                  <option value=""> -- Select --</option>
                  {
                    allVendor.map((vendor,index) => <option key={index} value={vendor.vendor_code}>{vendor.name} —  {vendor.vendor_code}</option>
                    )
                  }
                </Field>

              </div>
              <div className="mb-1 text-center">
                <button type="submit" className="btn btn-primary m-auto" >Place Order</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CreatePurchaseOrder;

