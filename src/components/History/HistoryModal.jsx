import React from "react";

export default function HistoryModal({ detailData }) {
  function formatNumber(num) {
    return "Rp. " + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }
  if (detailData.length !== 0) {
    var RenderList = detailData.products.map(detail => {
      return (
        <div className="row" key={detail.id}>
          <div className="col-md-7">
            <p className="text-body font-weight-normal">
              {detail.name + " " + detail.qty}x
            </p>
          </div>
          <div className="col-md-5 text-right">
            <p className="text-body font-weight-normal">
              {formatNumber(detail.total)}
            </p>
          </div>
        </div>
      );
    });
  }
  let subtotal = formatNumber(parseInt(detailData.sub_total));
  let ppns = formatNumber(parseInt(detailData.ppn));
  let totals = formatNumber(parseInt(detailData.total));
  return (
    <div
      className="modal fade"
      id="detailOrders"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="detailOrders"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="detailOrders">
              Reciept no:&nbsp;#{detailData.order_number}
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
            <div className="container">
              {RenderList}
              <hr />
              <div className="row">
                <div className="col-md-7">
                  <p className="text-body text-body font-weight-normal">
                    Sub Total
                  </p>
                </div>
                <div className="col-md-5 text-right">
                  <p className="text-body text-body font-weight-normal">
                    {subtotal}
                  </p>
                </div>
                <div className="col-md-7">
                  <p className="text-body text-body font-weight-normal">
                    Ppn 10%
                  </p>
                </div>
                <div className="col-md-5 text-right">
                  <p className="text-body text-body font-weight-normal">
                    {ppns}
                  </p>
                </div>
                <div className="col-md-7">
                  <p className="text-body text-body font-weight-normal">
                    Total
                  </p>
                </div>
                <div className="col-md-5 text-right">
                  <p className="text-body text-body font-weight-normal">
                    {totals}
                  </p>
                </div>
                <div className="col-12">
                  <p className="text-body text-body font-weight-normal">
                    Payment: Cash
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
