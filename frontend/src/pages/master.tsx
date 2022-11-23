import { Fragment, ReactFragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, OutletProps, useLocation, useNavigate } from "react-router-dom";
import Footer from "./partials/footer";
import Header from "./partials/header";
import Sidebar from "./partials/sidebar";

export const AuthLayout = (props) => {
    const user = useSelector((state: any) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.token) {
            navigate("/login", { replace: true });
        }
    }, []);

    const history = useLocation()


    useEffect(() => {
        console.log("test")
    }, [history.pathname])


    return (
        <Fragment>
            <div className="main-wrapper">
                <div className="page-wrapper">
                    <Header />
                    <Sidebar />
                    <div className="page-content">
                        {props.children}
                    </div>
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

