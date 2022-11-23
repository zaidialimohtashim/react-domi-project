import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { faDashboard, faUsers, faTableList, faUserAstronaut, faCubes, faTrophy, faSitemap, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { Navigate, Link, useLocation } from 'react-router-dom';
import React, { Fragment } from 'react';

const Sidebar = () => {
    const location = useLocation();
    const CMS = ["/privacy-policy", "/terms-and-condition", "/help-center", "/faq"];
    console.log()
    const toggleMenu = (id) => {
        let x = document.getElementById(id);
        if (x.style.display === "none" || x.style.display == "") {
            x.style.display = "block";
            x.style.opacity = '1';
        } else {
            x.style.display = "none";
            x.style.opacity = '0';
        }
    }
    return (
        <Fragment>
            <nav className="sidebar">
                <div className="sidebar-header">
                    <a href="#" className="sidebar-brand">
                        Dominoes<span> Panel</span>
                    </a>
                    {/* <div className="sidebar-toggler not-active">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div> */}
                </div>
                <div className="sidebar-body">
                    <ul className="nav">
                        <li className={location.pathname == "/" ? "nav-item active" : "nav-item"}>
                            <Link className="nav-link" to="/">
                                <FontAwesomeIcon icon={faDashboard} />
                                <span className="link-title">&nbsp;Dashboard</span>
                            </Link>
                        </li>
                        <li className={location.pathname == "/user-listing" ? "nav-item active" : "nav-item"}>
                            <Link className="nav-link" to="/user-listing">
                                <FontAwesomeIcon icon={faUsers} />
                                <span className="link-title">Users Management</span>
                            </Link>
                        </li>
                        <li className={location.pathname == "/avatar-management" ? "nav-item active" : "nav-item"}>
                            <Link className="nav-link" to="/avatar-management">
                                <FontAwesomeIcon icon={faUserAstronaut} />
                                <span className="link-title">&nbsp;Avatar Management</span>
                            </Link>

                        </li>
                        <li className={location.pathname == "/asset-list" ? "nav-item active" : "nav-item"}>
                            <Link className="nav-link" to="/asset-list">
                                <FontAwesomeIcon icon={faCubes} />
                                <span className="link-title">Asset Builder</span>
                            </Link>
                        </li>
                        <li className={location.pathname == "/tournament-list" ? "nav-item active" : "nav-item"}>
                            <Link className="nav-link" to="/tournament-list">
                                <FontAwesomeIcon icon={faTrophy} />
                                <span className="link-title">Tournaments</span>
                            </Link>
                        </li>
                        {/* CMS[CMS.indexOf(location.pathname)] */}
                        <li className={location.pathname == CMS[CMS.indexOf(location.pathname)] ? "nav-item active" : "nav-item"}>
                            <Link className="nav-link" to="#" onClick={() => { toggleMenu('uiComponents') }} role="button" aria-expanded="false" aria-controls="uiComponents">
                                <FontAwesomeIcon icon={faSitemap} />
                                <span className="link-title">CMS</span>
                                <FontAwesomeIcon className="link-arrow" icon={faCaretDown} />
                            </Link>
                            <div className={location.pathname == CMS[CMS.indexOf(location.pathname)] ? "" : "collapse uiComponents"} id="uiComponents">
                                <ul className="nav sub-menu">
                                    <li className={location.pathname == "/privacy-policy" ? "nav-item active" : "nav-item"}>
                                        <Link className="nav-link" to="/privacy-policy">
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li className={location.pathname == "/terms-and-condition" ? "nav-item active" : "nav-item"}>
                                        <Link className="nav-link" to="/terms-and-condition">
                                            Terms and Conditions
                                        </Link>
                                    </li>
                                    <li className={location.pathname == "/help-center" ? "nav-item active" : "nav-item"}>
                                        <Link className="nav-link" to="/help-center">
                                            Help Center
                                        </Link>
                                    </li>
                                    <li className={location.pathname == "/faq" ? "nav-item active" : "nav-item"}>
                                        <Link className="nav-link" to="/faq">
                                            FAQ's
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </Fragment>
    );
}

export default Sidebar;