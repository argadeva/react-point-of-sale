import React, { Component } from "react";
import API from "../../axios/Api";
import qs from "qs";

export class UpdateStocks extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  handleFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    const bodyFormData = qs.stringify({
      name: this.state.name !== "" ? this.state.name : this.props.data.name,
      email: this.state.email !== "" ? this.state.email : this.props.data.email,
      password:
        this.state.password !== ""
          ? this.state.password
          : this.props.data.password
    });
    await API.patch(`/users/${this.props.data.id}`, bodyFormData, {
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        "x-access-token": localStorage.usertoken
      }
    }).then(res => {
      console.log(res);
    });
  };

  render() {
    var data = this.props.data;
    return (
      <form>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Name</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              defaultValue={data.name}
              name="name"
              onChange={this.handleFormChange}
              required
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Email</label>
          <div className="col-sm-9">
            <input
              type="email"
              className="form-control"
              name="email"
              defaultValue={data.email}
              onChange={this.handleFormChange}
              required
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Password</label>
          <div className="col-sm-9">
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleFormChange}
              required
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-12">
            <div className="float-right mt-3">
              <button
                type="button"
                className="btn btn-secondary mr-3"
                data-dismiss="modal"
              >
                Cancel&nbsp;<i className="fas fa-times"></i>
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleSubmit}
              >
                Update&nbsp;<i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default UpdateStocks;
