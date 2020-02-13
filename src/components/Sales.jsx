import React, { Component } from "react";
import Sidebar from "./Sidebar";
import API from "../axios/Api";
import qs from "qs";

import ListProduct from "./Sales/ListProduct";
import ListCart from "./Sales/ListCart";
import CheckoutModal from "./Sales/CheckoutModal";

export default class Sales extends Component {
  state = {
    products: [],
    carts: [],
    noOrder: "",
    idOrder: "",
    detailCheckout: [],
    ppn: "",
    total: ""
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

  componentDidMount = async () => {
    await API.get("/products/onstock", {
      headers: { "x-access-token": localStorage.usertoken }
    }).then(response =>
      this.setState({
        products: response.data.result
      })
    );
    await this.inputScript();
  };

  selectedProduct = product => {
    if (product.stock > 0) {
      const index = this.state.carts.findIndex(function(onCarts) {
        return onCarts.id === product.id;
      });
      if (index < 0) {
        var newProduct = Object.assign(product, { qty: 1 });
        this.setState({
          carts: this.state.carts.concat(newProduct)
        });
      }
    }
  };

  plusProduct = id => {
    const index = this.state.carts.findIndex(function(onCarts) {
      return onCarts.id === id;
    });
    let carts = [...this.state.carts];
    let cart = { ...carts[index] };
    cart.qty += 1;
    carts[index] = cart;
    if (this.state.carts[index].stock >= cart.qty) {
      this.setState({ carts });
    }
  };

  minProduct = id => {
    const index = this.state.carts.findIndex(function(onCarts) {
      return onCarts.id === id;
    });
    if (this.state.carts[index].qty > 1) {
      let carts = [...this.state.carts];
      let cart = { ...carts[index] };
      cart.qty -= 1;
      carts[index] = cart;
      this.setState({ carts });
    } else {
      const carts = this.state.carts.filter(cart => cart.id !== id);
      this.setState({ carts: carts });
    }
  };

  cancelCart = () => {
    this.setState({
      carts: []
    });
  };

  postCheckout = () => {
    for (let i = 0; i < this.state.carts.length; i++) {
      const bodyFormData = qs.stringify({
        order_id: this.state.idOrder,
        product_id: this.state.carts[i].id,
        qty: this.state.carts[i].qty
      });
      API.post("/checkout/cart", bodyFormData, {
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          "x-access-token": localStorage.usertoken
        }
      });
    }
  };

  submitCart = async () => {
    if (this.state.carts.length !== 0) {
      let inv = Date.now();
      await this.setState({
        noOrder: inv
      });
      await API.post(
        "/checkout",
        { order_number: inv },
        {
          headers: { "x-access-token": localStorage.usertoken }
        }
      ).then(response => {
        this.setState({
          idOrder: response.data.result.insertId
        });
      });
      await this.postCheckout();
      let subtotal = this.state.carts.reduce(function(prev, cur) {
        return prev + cur.price * cur.qty;
      }, 0);
      let ppx = (subtotal * 10) / 100;
      this.setState({
        ppn: ppx,
        total: subtotal + ppx
      });
      await API.get(`/checkout/${this.state.idOrder}`, {
        headers: { "x-access-token": localStorage.usertoken }
      }).then(response => {
        this.setState({
          detailCheckout: response.data
        });
      });
      console.log(this.state.detailCheckout);
    }
    await this.cancelCart();
  };

  render() {
    if (localStorage.usertoken === undefined) {
      this.props.history.push("/login");
    }
    function formatNumber(num) {
      return "Rp. " + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
    let countTotal = this.state.carts.reduce(function(prev, cur) {
      return prev + cur.price * cur.qty;
    }, 0);
    let countTotals = formatNumber(countTotal);

    let number = 1;
    const renderData = this.state.products.map(products => {
      function formatNumber(num) {
        return (
          "Rp. " + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
        );
      }
      return (
        <tr key={products.id}>
          <td className="text-center">{number++}</td>
          <td>{products.name}</td>
          <td className="text-center">{products.categories}</td>
          <td className="text-right">{formatNumber(products.price)}</td>
          <td className="text-center">{products.stock}</td>
          <td className="text-center">
            <button
              data-toggle="modal"
              data-target="#UpdateModalCenter"
              className="btn btn-secondary rounded-circle border-0"
              onClick={() => this.selectedProduct(products)}
            >
              <i class="fas fa-share"></i>
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
            <div className="row m-0">
              <div className="col-md-8 p-0">
                <nav className="topmenu navbar navbar-light bg-white p-4">
                  <div className="ml-auto mr-auto">
                    <ul className="navbar-nav">
                      <li className="nav-item active">
                        <h5 className="font-weight-bold m-0">Sales</h5>
                      </li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#modalProduct"
                    className="btn btn-secondary rounded-circle mr-2"
                  >
                    <i class="fas fa-search"></i>
                  </button>
                </nav>
                <div className="px-2 py-4">
                  <div className="container">
                    <div className="row">
                      <ListProduct
                        selectedProduct={this.selectedProduct}
                        data={this.state.products}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 p-0 bg-white cart">
                <nav className="topmenu navbar navbar-light bg-white p-4 shadow-sm">
                  <div className="ml-auto mr-auto">
                    <ul className="navbar-nav">
                      <li className="nav-item active">
                        <h5 className="font-weight-bold m-0">
                          Cart
                          <button class="btn btn-sm btn-primary rounded-circle ml-2">
                            &nbsp;{this.state.carts.length}&nbsp;
                          </button>
                        </h5>
                      </li>
                    </ul>
                  </div>
                </nav>
                <div className="p-4 cartside">
                  <div className="container">
                    <div className="row">
                      {this.state.carts.length === 0 ? (
                        <div className="mx-auto mt-5 text-center">
                          <h1 className="text-danger">
                            <i className="fas fa-cart-arrow-down fa-2x"></i>
                          </h1>
                          <h4 className="mt-4">Your cart is empty</h4>
                          <span className="small">
                            Please add some items from the menu
                          </span>
                        </div>
                      ) : null}
                      <ListCart
                        list={this.state.carts}
                        plusProduct={this.plusProduct}
                        minProduct={this.minProduct}
                      />
                    </div>
                  </div>
                </div>
                <div className="cartbtn p-4">
                  <div className="row">
                    <div className="col-md-3">
                      <h5 className="font-weight-bold">Total</h5>
                    </div>
                    <div className="col text-right">
                      <h5 className="font-weight-bold">{countTotals}</h5>
                    </div>
                  </div>
                  <p className="mb-2">*Tax not included</p>
                  {this.state.carts.length !== 0 ? (
                    <button
                      type="button"
                      className="btn btn-primary btn-block mb-3"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      onClick={this.submitCart}
                    >
                      <i className="fas fa-cart-plus"></i>&nbsp;Checkout
                    </button>
                  ) : null}

                  <button
                    type="button"
                    className="btn btn-secondary btn-block"
                    onClick={this.cancelCart}
                  >
                    <i className="fas fa-times"></i>&nbsp;Cancel
                  </button>
                </div>
              </div>
            </div>
            <CheckoutModal
              detailData={this.state.detailCheckout}
              ppn={this.state.ppn}
              total={this.state.total}
            />
          </div>
        </div>
        <div
          className="modal fade"
          id="modalProduct"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-body">
                <div className="table-responsive">
                  <table
                    id="dataTabel"
                    className="table table-hover dataTable no-footer"
                  >
                    <thead className="btn-primary">
                      <tr className="text-center">
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
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
            </div>
          </div>
        </div>
      </>
    );
  }
}
