import React, { Component } from "react";
import API from "../axios/Api";
import AddStocks from "./Stocks/AddStocks";
import UpdateStocks from "./Stocks/UpdateStocks";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Sidebar from "./Sidebar";

const MySwal = withReactContent(Swal);

export default class Stocks extends Component {
  state = {
    Stocks: [],
    editID: [],
    loading: true
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
    await API.get("/stocks", {
      headers: { "x-access-token": localStorage.usertoken }
    }).then(response =>
      this.setState({
        Stocks: response.data.result
      })
    );
  };

  componentDidMount = async () => {
    await this.getAPI();
    await setTimeout(() => {
      this.inputScript();
      this.setState({
        loading: false
      });
    }, 1000);
  };

  handleRemove = data => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        API.delete(`/stocks/${data}`, {
          headers: { "x-access-token": localStorage.usertoken }
        }).then(() => this.getAPI());
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
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
      } else if (this.state.loading === true) {
        return (
          <>
            <div className="loader">
              <div className="inner one" />
              <div className="inner two" />
              <div className="inner three" />
              <span>
                <br />
                <br />
                <br />
                Loading...
              </span>
            </div>
          </>
        );
      }
    }
    let number = 1;
    const renderData = this.state.Stocks.map(Stocks => {
      return (
        <tr key={Stocks.id}>
          <td>{number++}</td>
          <td>{Stocks.product_name}</td>
          <td>{Stocks.type}</td>
          <td>{Stocks.qty}</td>
          <td>{Stocks.description}</td>
          <td>
            <button
              data-toggle="modal"
              data-target="#UpdateModalCenter"
              className="btn btn-outline-warning border-0"
              onClick={() => this.handleUpdate(Stocks)}
            >
              <i className="far fa-edit"></i>
            </button>
            <button
              className="ml-2 btn btn-outline-danger border-0"
              onClick={() => this.handleRemove(Stocks.id)}
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
                    <h5 className="font-weight-bold m-0">Stocks</h5>
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
                    Add Stocks
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
                        <th scope="col">Product</th>
                        <th scope="col">Type</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Description</th>
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
                        Add Stocks
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
                      <AddStocks />
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
                        Update Stocks
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
                      <UpdateStocks data={this.state.editID} />
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
