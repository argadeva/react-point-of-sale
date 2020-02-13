import React, { Component } from "react";
import { login } from "./UserFunction";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    login(user).then(res => {
      if (res !== 0) {
        this.props.history.push("/");
      }
    });
  };

  render() {
    if (localStorage.usertoken !== undefined) {
      this.props.history.push("/");
    }
    return (
      <div className="container-fluid p-5 login">
        <div className="row mt-5">
          <div className="col-md-4 mx-auto">
            <div className="card login-card shadow-lg rounded-0 p-3">
              <div className="p-3 text-center">
                <h3 className="font-weight-bolder">Point Of Sales</h3>
              </div>
              <div className="card-body">
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control reform"
                      name="email"
                      placeholder="Enter Email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Password</label>
                    <input
                      type="password"
                      className="form-control reform "
                      name="password"
                      placeholder="Enter Password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
