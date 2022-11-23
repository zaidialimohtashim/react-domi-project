import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import LoginComponent from "../../Components/LoginComponent";

const Login = () => {
  const data = useSelector((state: RootState) => state.auth.user);
  return <LoginComponent />;
};

export default Login;
