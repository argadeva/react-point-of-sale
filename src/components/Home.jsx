import React, { Component } from "react";
import Sidebar from "./Sidebar";

export default class Home extends Component {
  render() {
    if (localStorage.usertoken === undefined) {
      this.props.history.push("/login");
    } else {
      this.props.history.push("/sales");
    }

    return (
      <>
        <div className="wrapper">
          <Sidebar />
          <div id="content">
            <h1>
              <i class="fas fa-camera"></i>Home
            </h1>
          </div>
        </div>
      </>
    );
  }
}
