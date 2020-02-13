import React, { Component } from "react";
import API from "../../axios/Api";

export class AddProducts extends Component {
  state = {
    name: "",
    description: "",
    image: null,
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
    await bodyFormData.append("name", this.state.name);
    await bodyFormData.append("description", this.state.description);
    await bodyFormData.append("price", this.state.price);
    await bodyFormData.append("category_id", this.state.category_id);
    await bodyFormData.append("image", this.state.image);
    await API.post("/products", bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": localStorage.usertoken
      }
    }).then(res => {
      console.log(res);
    });
  };

  render() {
    const renderCategories = this.state.categoryList.map(categoryList => {
      return (
        <option key={categoryList.id} value={categoryList.id}>
          {categoryList.name}
        </option>
      );
    });
    return (
      <form>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Name</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
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
              <option selected>Choose...</option>
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
              placeholder="Price"
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
              placeholder="Description"
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
                Add&nbsp;<i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default AddProducts;
