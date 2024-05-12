import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        username:'',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const baseURL = "http://localhost:8000"
            const URL = `${baseURL}/api/signup/`

            const response = await fetch(URL,{
                    method:"POST",
                    headers:{
                    'Content-Type': 'application/json', 
                    },
                    body:JSON.stringify(formData), 
                });
                
                const result = await response.json();
                console.log(result)
                if(result['success']){
                    alert("Account Created successfully.")
                    setFormData({email: '', first_name: '',last_name: '',password: ''})
                    navigate('/login')
                }
                else{
                    alert(result['error'])
                }

    }
  return (
    <>
     
    <div className="container-fluid">
        <div className="row">
            <div className="col col-lg-3 col-md-6 col-sm-8 m-auto py-3 ">
                <div className="mt-5 p-4" style={{border: '1px solid gray', borderRadius: '5px'}}>
                    <form method="POST" id="myform" onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3 form-group">
                            <h4 className="text-center">Sign Up</h4>
                        </div>
                        <div className="mb-2 form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username"
                                aria-describedby="emailHelp" name="username" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div className="mb-2 form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" id="email"
                                aria-describedby="emailHelp" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-2 form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password"
                             name="password" value={formData.password} onChange={handleChange} required/>
                        </div>
                        <div style={{textAlign: 'center'}} className="mt-3 d-grid">
                            <button type="submit"  className="btn btn-primary btn-block">Sign Up</button>
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <hr />
                            Already Have account? <Link to="/login">Log In</Link> Here
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script>
        
    </script>
    </>
  );
}

export default Register;
