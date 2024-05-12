import { Link, useNavigate } from 'react-router-dom';
const Navbar = (props) => {

    const navigate = useNavigate()

    const {loginStatus, setLoginStatus } = props

    const handleLogout = ()=>{
        setLoginStatus(false)
        window.localStorage.removeItem('token')   
        navigate('/login');
    }

    return (
        <>
            <nav className="navbar navbar-expand-xl bg-body-tertiary navbar-light" style={{backgroundColor: "#a7c2d4"}}>
                <div className="container my-1">
                    <span className="navbar-brand bold"> <h1>Vendor Management System </h1></span>
                    <div>
                    {!loginStatus ?
                    <>
                        <Link className="mx-1 btn btn-success" to="/login">Log In</Link>
                        <Link className="mx-1 btn btn-outline-warning" to="/register">Sign Up</Link>
                    </>
                        :
                        <button className="mx-1 btn btn-danger" onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
