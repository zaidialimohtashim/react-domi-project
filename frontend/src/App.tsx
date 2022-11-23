import React, { useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import {
  Routes,
  Route,
  Outlet,
  useNavigate,
  Navigate,
  useLocation
} from "react-router-dom";

import Login from "./pages/auth/login";
import Dashboard from "./pages/Dashboard";
import Footer from "./pages/partials/footer";
import Sidebar from "./pages/partials/sidebar";
import UserListingView from "./pages/user_managment/listing";
import AvatarManagementView from "./pages/avatar_management/list";
import Header from "./pages/partials/header";
import AddAvatarCategory from "./pages/avatar_management/add";
import { LoaderComponent } from "./Components/LoaderComponent";
import Assetbuilder from "./pages/asset_builder/assetbuilder"
import EditAvatarCatory from "./pages/avatar_management/edit";
import AssetsManagementView from "./pages/asset_builder/list";
import EditAssetbuilder from "./pages/asset_builder/edit";
import TournamentsView from "./pages/tournaments/list";
import { PrivacyPolicy } from "./pages/cms/privacy_policy";
import { TermsConditions } from "./pages/cms/terms_and_conditions";
import { HelpCenter } from "./pages/cms/help_center";
import { Faq } from "./pages/cms/faq/faq";
import { AddFaq } from "./pages/cms/faq/add";
import { EditFaq } from "./pages/cms/faq/edit";
import AddAssets from "./pages/asset_builder/add";
const Layout = () => {
  const user = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate();
  const Logout = () => {

  };
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
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};

function App() {
  const user = useSelector((state: any) => state.auth.user);
  const handleChange = (e) => {
    console.log(e)
  }
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index={true} element={<Dashboard />} />
      </Route>
      <Route path="/user-listing" element={<UserListingView />} />
      <Route path="/avatar-management" element={<AvatarManagementView />} />
      <Route path="/add-avatar" element={<AddAvatarCategory />} />
      <Route path="/tournament-list" element={<TournamentsView />} />
      <Route path="/asset-builder" element={<AddAssets />} />
      <Route path="/terms-and-condition" element={<TermsConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/add-faq" element={<AddFaq />} />
      <Route path="/edit-faq/:id" element={<EditFaq />} />
      <Route path="/edit-asset-builder/:id" element={<EditAssetbuilder />} />
      <Route path="/asset-list" element={<AssetsManagementView />} />
      <Route path="/edit-avatar-category/:id" element={<EditAvatarCatory />} />
      <Route path="login" element={user.token ? <Navigate to="/" /> : <Login />} />
    </Routes>
  );
}

export default App;
