import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from '../superceed_logo.png';

const Navbar = (props) => {
    const [active, setActive] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    
    const handleActiveLink = (e) => {
        setActive(e.currentTarget.id);
    }

    const toggleDropdown = (e) => {
        console.log(showDropdown);
        setShowDropdown(!showDropdown);
    }

    return (
        <nav className="navbar">
            <ul className="navbar-nav">
            <li className="logo" >
                <Link to="/" className="nav-link-logo" id='logo' onClick={handleActiveLink}>
                <img src={logo} alt="logo" width="40" height="40" padding-left='1rem' ></img>
                <span className="link-text">SuperSight</span>
                </Link>
            </li>
            <li className="nav-item" >
                <Link to="/upload" id='upload' className={`nav-link ${active === 'upload' ? "active" : ""}`} onClick={handleActiveLink}>
                <i className="fa-solid fa-file-arrow-up"></i>
                <span className="link-text">Upload</span>
                </Link>
            </li>
            <li className="nav-item" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                <Link to="/insights" id='insights' className={`nav-link ${active === 'insights' ? "active" : ""}`} onClick={handleActiveLink} >
                <i className="fa-solid fa-crosshairs"></i>
                <span className="link-text">Insights</span>
                </Link>
                <Link to='/insights/emotions' id='insights' className={`nav-dropdown ${showDropdown ? 'show': ''}`} onClick={handleActiveLink}>
                    <span className="link-text">Emotions</span>
                </Link>
								<Link to='/insights/summarize' id='insights' className={`nav-dropdown ${showDropdown ? 'show': ''}`} onClick={handleActiveLink}>
                    <span className="link-text">Summarize</span>
                </Link>
            </li>
            <li className="nav-item" >
                <Link to="/saved" id='saved' className={`nav-link ${active === 'saved' ? "active" : ""}`} onClick={handleActiveLink}>
                <i className="fa-solid fa-bookmark"></i>
                <span className="link-text">Saved</span>
                </Link>
            </li>
            </ul>
        </nav>
    )
}

export default Navbar;