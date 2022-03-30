import { useState } from "react";
import "./styles.scss";
import { useContext } from "react";
import UserContextInfo from "../context.js";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function LoginSignup(props) {
  const isSignUp = props.isSignUp;
  const HandleSignUp = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  //  const getUserProject=(user)=>{
  //      console.log(user)
  //     return;
  //     props.app.state.user=user;
  //      fetch('',{})
  //      .then(res=>res.json())
  //      .then(json=>{console.log(json)})
  //      .catch(err=>console.log(err));
  //  };
  const [loginStatus, getGetLoginStatusMsg] = useState("");
  const HandleLogin = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    login(username, password);
  };

  const login = (username, password) => {
    fetch(
      `http://localhost:6001/login?username=${username}&password=${password}`,
      {
        method: "GET",
        credentials: "include",
        referrerPolicy: "origin-when-cross-origin",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    )
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          props.setUserInfo(json);
          navigate("/home");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  const username = Cookies.get("username");
  const password = Cookies.get("password");

  if (username && password) {
    login(username, password);
    return <></>;
  } else {
    return (
      <section>
        <div>
          <div className="form-box solid">
            <form onSubmit={(e) => HandleLogin(e)}>
              {isSignUp ? (
                <h1 className="login-text">Sign Up</h1>
              ) : (
                <h1 className="login-text">Login</h1>
              )}

              {isSignUp ? (
                <>
                  <label htmlFor="fname">
                    First Name :
                    <input
                      type="text"
                      name="fname"
                      className="login-box"
                      required
                    />
                  </label>
                  <br></br>
                  <label htmlFor="lname">
                    {" "}
                    Last Name :
                    <input
                      type="text"
                      name="lname"
                      className="login-box"
                      required
                    />
                  </label>
                </>
              ) : (
                <></>
              )}
              <br></br>
              <label htmlFor="username">
                {" "}
                User Name :
                <input
                  type="text"
                  name="username"
                  className="login-box"
                  required
                />
              </label>
              <br></br>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  className="login-box"
                  required
                />
              </label>
              <br></br>
              <h5>{loginStatus}</h5>

              {isSignUp ? (
                <input type="submit" value="SIGNUP" className="-btn" />
              ) : (
                <input type="submit" value="LOGIN" className="login-btn" />
              )}
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default LoginSignup;
