import React ,{useEffect, useState}from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UpdateVendor = () => {
    const { vendor_code } = useParams()

    const navigate = useNavigate();
    const [vendor, setvendor] = useState({ name: "", address: "", contact_details: "" });

    const handleVendorUpdate = async (values)=>{
        console.log(values)
        const URL = `${process.env.REACT_APP_API_URL}/api/vendors/${vendor_code}/`
            const response = await fetch(URL,{
                    method:"PUT",
                    headers:{
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${window.localStorage.getItem('token')}`
                    },
                    body:JSON.stringify(values),
                });
                const result = await response.json();
                console.log(result)
                if(result['success']){
                    alert("Vendor Details Updated successfully");
                    navigate('/vendors')
                }
                else{
                    alert(result['error'])
                }  
    }
    const getVendorDetails =async()=>{
        const URL = `${process.env.REACT_APP_API_URL}/api/vendors/${vendor_code}`

            const response = await fetch(URL,{
                    method:"GET",
                    headers:{
                    "Authorization": `Bearer ${window.localStorage.getItem('token')}`
                    },
                });
                const result = await response.json();
                if(result['success']){
                    setvendor(result['success'])
                }  
    }
    useEffect(() => {
        getVendorDetails()
    });
    return (
        <div>
            <h2 className='mt-3'>Update Vendor Details </h2>
            <div className='col-5 m-auto p-4' style={{ border: "1px solid gray" }}>
                <Formik
                    enableReinitialize={true}
                    initialValues={vendor}
                    onSubmit={(values)=>handleVendorUpdate(values)}
                >
                    <Form>
                        <label htmlFor="name"> <b> Vendor Code - {vendor_code} </b></label><br />
                        <hr/>
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
                            <button type="submit" className="btn btn-primary mx-2" >Update</button>
                            <Link to="/vendors" type="button" className="btn btn-outline-danger m-auto">Cancel</Link>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default UpdateVendor;
