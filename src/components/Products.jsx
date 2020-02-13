import React, { Component } from "react";
import API from "../axios/Api";
import AddProducts from "./Products/AddProducts";
import UpdateProducts from "./Products/UpdateProducts";

import Sidebar from "./Sidebar";

export default class Products extends Component {
  state = {
    products: [],
    editID: []
  };

  inputScript = async () => {
    await setTimeout(() => {
      const script1 = document.createElement("script");
      script1.async = true;
      script1.src = "/assets/dataTabels/datatables.min.js";
      document.body.appendChild(script1);
    }, 100);
    await setTimeout(() => {
      const script2 = document.createElement("script");
      script2.async = true;
      script2.src = "/assets/dataTabels/mytabel.js";
      document.body.appendChild(script2);
    }, 200);
  };

  getAPI = async () => {
    await API.get("/products", {
      headers: { "x-access-token": localStorage.usertoken }
    }).then(response =>
      this.setState({
        products: response.data.result
      })
    );
  };

  componentDidMount = async () => {
    await this.getAPI();
    await this.inputScript();
  };

  handleRemove = data => {
    API.delete(`/products/${data}`, {
      headers: { "x-access-token": localStorage.usertoken }
    }).then(() => this.getAPI());
  };

  handleUpdate = data => {
    this.setState({
      editID: data
    });
  };
  render() {
    if (localStorage.usertoken === undefined) {
      this.props.history.push("/login");
    } else {
      const checkUser = localStorage.usertoken.substr(
        0,
        localStorage.usertoken.indexOf("#")
      );
      if (checkUser !== "1") {
        this.props.history.push("/login");
      }
    }
    let number = 1;
    const renderData = this.state.products.map(products => {
      function formatNumber(num) {
        return (
          "Rp. " + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
        );
      }
      return (
        <tr key={products.id}>
          <td>{number++}</td>
          <td>
            {products.image !== "" ? (
              <img
                src={products.image}
                className="img-fluid"
                alt={products.name}
              />
            ) : (
              <img
                src="/assets/image/noimage.jpg"
                className="img-fluid"
                alt={products.name}
              />
            )}
          </td>
          <td>{products.name}</td>
          <td>{products.description}</td>
          <td>{products.categories}</td>
          <td>{formatNumber(products.price)}</td>
          <td>{products.stock}</td>
          <td>
            <button
              data-toggle="modal"
              data-target="#UpdateModalCenter"
              className="btn btn-outline-warning border-0"
              onClick={() => this.handleUpdate(products)}
            >
              <i className="far fa-edit"></i>
            </button>
            <button
              className="ml-2 btn btn-outline-danger border-0"
              onClick={() => this.handleRemove(products.id)}
            >
              <i className="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      );
    });
    return (
      <>
        <div className="wrapper">
          <Sidebar />
          <div id="content">
            <nav id="navbar" className="navbar navbar-light bg-white p-4">
              <div className="ml-auto mr-auto">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <h5 className="font-weight-bold m-0">Products</h5>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="p-4">
              <div className="card p-3 shadow-sm">
                <div className="card-head">
                  <button
                    className="btn btn-primary mb-5"
                    data-toggle="modal"
                    data-target="#AddModalCenter"
                  >
                    Add Products
                  </button>
                </div>
                <div className="table-responsive">
                  <table
                    id="dataTabel"
                    className="table table-hover text-center dataTable no-footer"
                  >
                    <thead className="btn-primary">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col" width="50px">
                          Image
                        </th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Categories</th>
                        <th scope="col">Price</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>{renderData}</tbody>
                  </table>
                </div>
              </div>
              <div
                className="modal fade"
                id="AddModalCenter"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="AddModalCenterTitle"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">
                        Add Products
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <AddProducts />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal fade"
                id="UpdateModalCenter"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="AddModalCenterTitle"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">
                        Update Products
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <UpdateProducts data={this.state.editID} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
