import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar background_regular shadow">
            <div className="container-fluid mx-2">
                <div className="nav">
                    <Link to="/auth/login" className="btn btn-outline-light">Login</Link>
                    <Link to="/auth/signup" className="btn btn-outline-light ms-2">Signup</Link>
                </div>
            </div>
        </nav>
    );
}