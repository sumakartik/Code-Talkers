import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Home/Home";
import "./index.scss";

export default class App extends React.Component {
  constructor(props) {
    this.state = {
      user: props.user,
      isLogedIn: false,
    };
  }
  userIsLogedIn() {}
  componentDidMount() {
    if (this.state.user.username && this.state.user.password) {
      fetch("http://localhost:", {
        method: "GET",
        credentials: "include",
        referrerPolicy: "origin-when-cross-origin",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((user) => {
          if (user.username.length) this.setState({ user: user });
        });
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        <Home />
      </div>
    );
  }
}
