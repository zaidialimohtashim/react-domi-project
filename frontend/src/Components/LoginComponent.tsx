import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginApi } from "../../api/auth";
import { authSlice } from "../../redux/authSlice";
import { errorSlice } from "../../redux/errorSlice";
import { RootState } from "../../redux/store";

// import { login } from "../../api/api";

const LoginComponent = () => {
  const navigate = useNavigate();
  const error = useSelector((state: any) => state.errors.error);
  const { setToken } = authSlice.actions;
  const { setErrors } = errorSlice.actions;
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const submitLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      let userLogin = await LoginApi({ email, password });

      dispatch(setToken(userLogin.data.data));
      navigate('/');
    } catch (e) {
      dispatch(setErrors(e.response.data.msg));
    }
  };


  return (
    <div className="main-wrapper">
      <div className="page-wrapper full-page">
        <div className="page-content d-flex align-items-center justify-content-center">
          <div className="row w-100 mx-0 auth-page">
            <div className="col-md-8 col-xl-6 mx-auto">
              <div className="card">
                <div className="row">
                  <div className="col-md-12 pl-md-0">
                    <div className="auth-form-wrapper px-4 py-5 ">
                      <a
                        href="#"
                        className="noble-ui-logo d-block mb-2 text-center"
                      >
                        Dominos <span>- Admin Panel</span>
                      </a>
                      {error &&
                        <div className="alert alert-danger text-center">{error}</div>
                      }
                      <h5 className="text-muted font-weight-normal mb-4 text-center">
                        Welcome back! Log in to your account.
                      </h5>
                      <form
                        onSubmit={submitLogin}
                        className="forms-sample px-4"
                        method="post"
                      >
                        <div className="form-group">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="text-left"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Email"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            Password
                          </label>
                          <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                            className="form-control"
                            id="exampleInputPassword1"
                            autoComplete="current-password"
                            placeholder="Password"
                          />
                        </div>

                        <div className="mt-3">
                          <button
                            type="submit"
                            className="btn btn-primary mr-2 mb-2 mb-md-0 text-white"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
