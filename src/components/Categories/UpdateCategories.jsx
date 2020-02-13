import React, { Component } from "react";
import API from "../../axios/Api";

export class UpdateCategories extends Component {
  state = {
    name: ""
  };

  handleFormChange = e => {
    let name = e.target.value;
    this.setState({
      name: name
    });
  };

  handleSubmit = async e => {
    await API.patch(`/categories/${this.props.data.id}`, this.state, {
      headers: { "x-access-token": localStorage.usertoken }
    }).then(res => {
      console.log(res);
    });
  };

  render() {
    let data = this.props.data;
    return (
      <form>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              defaultValue={data.name}
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
                Add&nbsp;<i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default UpdateCategories;
