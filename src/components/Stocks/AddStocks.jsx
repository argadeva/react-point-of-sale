import React, { Component } from "react";
import API from "../../axios/Api";
import qs from "qs";

export class AddStocks extends Component {
  state = {
    product_id: "",
    type: "",
    qty: "",
    description: "",
    productList: []
  };

  componentDidMount = async () => {
    await API.get("/products", {
      headers: { "x-access-token": localStorage.usertoken }
    }).then(response =>
      this.setState({
        productList: response.data.result
      })
    );
  };

  handleFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    const bodyFormData = qs.stringify({
      product_id: this.state.product_id,
      type: this.state.type,
      qty: this.state.qty,
      description: this.state.description
    });
    await API.post("/stocks", bodyFormData, {
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        "x-access-token": localStorage.usertoken
      }
    }).then(res => {
      console.log(res);
    });
  };

  render() {
    const renderCategories = this.state.productList.map(categoryList => {
      return (
        <option key={categoryList.id} value={categoryList.id}>
          {categoryList.name}
        </option>
      );
    });
    return (
      <form>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Products</label>
          <div className="col-sm-9">
            <select
              className="custom-select"
              name="product_id"
              defaultValue="Chosee Products..."
              onChange={this.handleFormChange}
              required
            >
              <option disabled>Chosee Products...</option>
              {renderCategories}
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Type</label>
          <div className="col-sm-9">
            <select
              className="custom-select"
              name="type"
              defaultValue="Chosee Type..."
              onChange={this.handleFormChange}
              required
            >
              <option disabled>Chosee Type...</option>
              <option value="in">In</option>
              <option value="out">Out</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Qty</label>
          <div className="col-sm-9">
            <input
              type="number"
              className="form-control"
              name="qty"
              min="0"
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
              name="description"
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

export default AddStocks;
