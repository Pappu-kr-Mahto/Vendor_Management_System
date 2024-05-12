import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate();
    const {loginStatus, setLoginStatus } = props

    useEffect(() => {
     if(loginStatus){
            navigate('/home')
     }
    });
    

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData( prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async (e) =>{
        e.preventDefault();

        const baseURL = "http://localhost:8000"
            const URL = `${baseURL}/api/login/`

            const response = await fetch(URL,{
                    method:"POST",
                    headers:{
                    'Content-Type': 'application/json', 
                    },
                    body:JSON.stringify(formData), 
                });
                
                const result = await response.json();
                console.log(result)
                if(result['access']){
                    setFormData({email: '',password: ''})
                    window.localStorage.setItem('token',result['access'])
                    window.localStorage.setItem('user',result['user'])
                    setLoginStatus(true)
                    navigate('/home')
                }
                else{
                    alert(result['error'])
                }
            
    }

  return (
    <>
     
    <div className="container-fluid">
      <div className="row">
        <div className="col col-lg-3 col-md-6 col-sm-8 m-auto py-3">
          <div
            className="mt-5 p-4"
            style={{border: '1px solid gray' , borderRadius: '5px'}}
          >
            
            <form method="POST" onSubmit={handleLogin} encType="multipart/form-data">
              <div className="mb-4 form-group">
                <h4 className="text-center">Log In</h4>
                
              </div>
              <div className="mt-3 form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </div>
              <div className="mb-3 form-group">
                <label htmlFor="passsword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
              </div>
              <div style={{textAlign: 'center'}} className="d-grid">
                <button type="submit" className="btn btn-primary btn-block">
                  Log In
                </button>
              </div>
              <div style={{textAlign: 'center'}}>
                <hr />
                Don't have account?<Link to="/register"> Sign Up </Link>Here
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

export default Login;
