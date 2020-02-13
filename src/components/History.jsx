import React, { Component } from "react";
import Sidebar from "./Sidebar";
import HistoryModal from "./History/HistoryModal";
import API from "../axios/Api";
import { Line } from "react-chartjs-2";

export default class History extends Component {
  state = {
    history: [],
    checkout: [],
    income: [],
    loading: true,
    detailorder: [],
    chartData: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      datasets: [
        {
          label: "This Month Income",
          data: [
            "10900",
            "11000",
            "10500",
            "10900",
            "11000",
            "10500",
            "10700",
            "11000",
            "10500",
            "10700",
            "11000",
            "11200"
          ],
          borderColor: ["rgba(242, 79, 138, 1)"],
          backgroundColor: ["rgba(5, 94, 165, 0.2)"],
          borderCapStyle: "round"
        }
      ]
    }
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
    await API.get("/history", {
      headers: { "x-access-token": localStorage.usertoken }
    }).then(response =>
      this.setState({
        history: response.data.history
      })
    );
    await API.get("/checkout", {
      headers: { "x-access-token": localStorage.usertoken }
    }).then(response =>
      this.setState({
        checkout: response.data.result
      })
    );
    await setTimeout(() => {
      this.inputScript();
      this.setState({
        loading: false
      });
    }, 1000);
  };

  selectedOrders = orders => {
    API.get(`/checkout/${orders.id}`, {
      headers: { "x-access-token": localStorage.usertoken }
    }).then(response =>
      this.setState({
        detailorder: response.data
      })
    );
    console.log(this.state.detailorder);
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
    function formatNumber(num) {
      return "Rp. " + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
    let number = 1;
    const orderTabels = this.state.checkout.map(orders => {
      let getDate = orders.created_at.slice(0, 10).split("-");
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      let mlong = months[getDate[1].replace(/^0+/, "") - 1];
      let _date = getDate[2] + " " + mlong + " " + getDate[0];
      return (
        <tr key={orders.id}>
          <td>{number++}</td>
          <td>{orders.order_number}</td>
          <td>{orders.name}</td>
          <td>{_date}</td>
          <td>{formatNumber(orders.total)}</td>
          <td>
            <button
              className="ml-2 btn btn-secondary rounded-circle"
              data-toggle="modal"
              data-target="#detailOrders"
              onClick={() => this.selectedOrders(orders)}
            >
              <i className="fas fa-receipt"></i>
            </button>
          </td>
        </tr>
      );
    });
    let todayIncomeStr = parseInt(this.state.history.todayIncome);
    let todayIncome = formatNumber(todayIncomeStr);
    let currentYearIncomeStr = parseInt(this.state.history.currentYearIncome);
    let currentYearIncome = formatNumber(currentYearIncomeStr);
    return (
      <>
        <div className="wrapper">
          <Sidebar />
          <div id="content">
            <nav className="topmenu navbar navbar-light bg-white p-4">
              <div className="ml-auto mr-auto">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <h5 className="font-weight-bold m-0">History</h5>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="container-fluid px-4 py-4">
              <div className="row">
                <div className="col-md-4 col-12">
                  <div className="card border-0 rounded orderCard p-4">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-3">Today Income</h6>
                      <h5 className="card-title mb-4">{todayIncome}</h5>
                      <h6 className="card-subtitle">
                        {Math.round(
                          (this.state.history.todayIncome /
                            this.state.history.yesterdayIncome) *
                            100 -
                            100
                        )}
                        % Yesterday
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="card border-0 rounded incomeCard p-4">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-3">Orders</h6>
                      <h5 className="card-title mb-4">
                        {this.state.history.orderthisWeek}
                      </h5>
                      <h6 className="card-subtitle">
                        {Math.round(
                          (this.state.history.orderthisWeek /
                            this.state.history.orderlastWeek) *
                            100 -
                            100
                        )}
                        % Last Week
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="card border-0 rounded income2Card p-4">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-3">This Year's Income</h6>
                      <h5 className="card-title mb-4">{currentYearIncome}</h5>
                      <h6 className="card-subtitle">
                        {Math.round(
                          (this.state.history.currentYearIncome /
                            this.state.history.lastYearIncome) *
                            100 -
                            100
                        )}
                        % Last Year
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-5">
                  <div className="card border-0 rounded">
                    <div className="card-body">
                      <Line
                        data={this.state.chartData}
                        options={{
                          legend: {
                            display: true,
                            position: "bottom"
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-5">
                  <div className="card border-0 rounded">
                    <div className="card-body">
                      <table
                        id="dataTabel"
                        className="table table-hover text-center"
                      >
                        <thead className="btn-primary">
                          <tr>
                            <th scope="col">#</th>
                            <th>INVOICES</th>
                            <th>CASHIER</th>
                            <th>DATE</th>
                            <th>AMOUNT</th>
                            <th>DETAILS</th>
                          </tr>
                        </thead>
                        <tbody>{orderTabels}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HistoryModal detailData={this.state.detailorder} />
      </>
    );
  }
}
