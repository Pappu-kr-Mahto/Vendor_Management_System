import './App.css';
import React , {useState, useEffect} from 'react';
import Navbar from './components/nav/Navbar';
import AppRoutes from './components/routes/AppRoutes';
import Sidebar from './components/nav/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
    const [loginStatus, setLoginStatus] = useState(false);
  
    useEffect(() => {
      const token = window.localStorage.getItem('token');
      if(token){
        setLoginStatus(true)
      }
    }, []);

  return (
    <>
      <Router>
        <Navbar loginStatus = {loginStatus} setLoginStatus= {setLoginStatus} />
        <div className="conainter-fluid">
          <div className="row d-flex" >
              <Sidebar loginStatus = {loginStatus} />
            <div className="col">
              <AppRoutes loginStatus = {loginStatus} setLoginStatus= {setLoginStatus} />
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
