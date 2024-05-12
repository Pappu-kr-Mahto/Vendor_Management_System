import React, { useState } from 'react';
import { Formik, Field, Form } from "formik";
import { useNavigate } from 'react-router-dom';
const AddVendor = () => {
    const navigate = useNavigate();
    const [vendor, setvendor] = useState({ name: "", address: "", contact_details: "" });

    const handleAddVendor =async (values)=>{
        const URL = `${process.env.REACT_APP_API_URL}/api/vendors/`

            const response = await fetch(URL,{
                    method:"POST",
                    headers:{
                    'Content-Type': 'application/json', 
                    "Authorization": `Bearer ${window.localStorage.getItem('token')}`
                    },
                    body:JSON.stringify(values), 
                });
                
                const result = await response.json();
                console.log(result)
                if(result['success']){
                    alert("Vendor Added successfully");
                    navigate('/vendors')
                }
                else{
                    alert(result['error'])
                }  
    }
    return (
        <>
            <h2 className='mt-3'>Enter Vendor Details</h2>
            <div className='col-5 m-auto p-4' style={{border:"1px solid gray"}}>
                <Formik
                    enableReinitialize={true}
                    initialValues={vendor}
                    onSubmit={(values)=>handleAddVendor(values)}
                >
                    <Form>
                        <div className="mb-1">
                            <label htmlFor="name" className="form-label"> Name</label><br />
                            <Field name="name" className="form-control" type="text" required /><br />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="contact_details" className="form-label"> Contact_Details</label><br />
                            <Field name="contact_details" className="form-control" type="text" required /><br />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="address" className="form-label"> Address</label><br />
                            <Field name="address" className="form-control" as="textarea" type="text" required /><br />
                        </div>
                        <div className="mb-1 text-center">
                        <button type="submit" className="btn btn-primary m-auto" >Submit</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    );
}

export default AddVendor;
