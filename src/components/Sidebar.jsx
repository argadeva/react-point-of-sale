import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import API from "../axios/Api";
import $ from "jquery";

class Sidebar extends Component {
  componentDidMount() {
    $("#sidebar").addClass("active");
    $("#sidebarCollapse").on("click", function() {
      $("#sidebar").toggleClass("active");
      $(".topmenu").toggleClass("p-4 p-3");
    });
  }

  logOut = e => {
    e.preventDefault();
    API.post(
      "/users/logout",
      { token: localStorage.usertoken },
      {
        headers: { "x-access-token": localStorage.usertoken }
      }
    )
      .then(() => {
        localStorage.removeItem("usertoken");
      })
      .then(() => {
        this.props.history.push("/login");
      });
  };
  render() {
    const adminView = (
      <>
        <li>
          <NavLink exact to="/sales">
            <i className="fas fa-cash-register"></i>
            Sales
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/products">
            <i className="fas fa-tags"></i>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/categories">
            <i className="fas fa-grip-horizontal"></i>
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/stocks">
            <i className="fas fa-box"></i>
            Stocks
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/users">
            <i className="fas fa-users"></i>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/history">
            <i className="fas fa-chart-line"></i>
            Reports
          </NavLink>
        </li>
      </>
    );
    const cashierView = (
      <>
        <li>
          <NavLink exact to="/">
            <i className="fas fa-cash-register"></i>
            Sales
          </NavLink>
        </li>
      </>
    );
    if (localStorage.usertoken !== undefined) {
      var checkUser = localStorage.usertoken.substr(
        0,
        localStorage.usertoken.indexOf("#")
      );
    }
    return (
      <>
        <nav id="sidebar" className="shadow-sm">
          <ul className="list-unstyled components">
            <li>
              <Link to="#" id="sidebarCollapse">
                <i className="fas fa-bars"></i>Menu
              </Link>
            </li>
            {checkUser === "1" ? adminView : cashierView}
            <li>
              <a href="/" onClick={this.logOut.bind(this)}>
                <i className="fas fa-sign-out-alt"></i>Logout
              </a>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default withRouter(Sidebar);
