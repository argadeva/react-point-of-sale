import React, { Component } from "react";
import API from "../../axios/Api";

export class UpdateProducts extends Component {
  state = {
    name: "",
    description: "",
    image: "",
    price: "",
    category_id: "",
    categoryList: []
  };

  componentDidMount = async () => {
    await API.get("/categories", {
      headers: { "x-access-token": localStorage.usertoken }
    }).then(response =>
      this.setState({
        categoryList: response.data.result
      })
    );
  };

  handleFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleFileUpload = event => {
    this.setState({
      image: event.target.files[0]
    });
  };

  handleSubmit = async e => {
    const bodyFormData = new FormData();
    await bodyFormData.append(
      "name",
      this.state.name !== "" ? this.state.name : this.props.data.name
    );
    await bodyFormData.append(
      "description",
      this.state.description !== ""
        ? this.state.description
        : this.props.data.description
    );
    await bodyFormData.append(
      "price",
      this.state.price !== "" ? this.state.price : this.props.data.price
    );
    await bodyFormData.append(
      "category_id",
      this.state.category_id !== ""
        ? this.state.category_id
        : this.props.data.category_id
    );
    if (this.state.image.length !== 0) {
      await bodyFormData.append("image", this.state.image);
    }
    await API.patch(`/products/${this.props.data.id}`, bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": localStorage.usertoken
      }
    }).then(res => {
      console.log(res);
    });
  };

  render() {
    var data = this.props.data;
    const renderCategories = this.state.categoryList.map(categoryList => {
      if (data.category_id === categoryList.id) {
        return (
          <option key={categoryList.id} value={categoryList.id} selected>
            {categoryList.name}
          </option>
        );
      } else {
        return (
          <option key={categoryList.id} value={categoryList.id}>
            {categoryList.name}
          </option>
        );
      }
    });

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
          <label className="col-sm-3 col-form-label">Categories</label>
          <div className="col-sm-9">
            <select
              className="custom-select"
              name="category_id"
              onChange={this.handleFormChange}
              required
            >
              {renderCategories}
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Price</label>
          <div className="col-sm-9">
            <input
              type="number"
              min="0"
              className="form-control"
              defaultValue={data.price}
              name="price"
              onChange={this.handleFormChange}
              required
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Description</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              defaultValue={data.description}
              name="description"
              onChange={this.handleFormChange}
              required
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Image</label>
          <div className="col-sm-9">
            <div className="custom-file">
              {data.image !== "" ? (
                <img
                  src={data.image}
                  className="img-fluid mb-3"
                  alt={data.name}
                  width="100px"
                />
              ) : (
                <i className="fas fa-camera mb-2"> No Image!</i>
              )}
              <input type="file" onChange={this.handleFileUpload} />
            </div>
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

export default UpdateProducts;
