import React from "react";

const CheckoutModal = ({ detailData, ppn, total }) => {
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

  let ppns = formatNumber(parseInt(ppn));
  let totals = formatNumber(parseInt(total));
  return (
    <div className="modal fade" id="exampleModalCenter">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="container">
              <div className="row">
                <div className="col-3">
                  <h5>Checkout</h5>
                  <p className="text-body font-weight-normal">
                    {detailData.name}
                  </p>
                </div>
                <div className="col-9 text-right">
                  <p className="text-body text-body font-weight-normal">
                    Reciept no:&nbsp;#{detailData.order_number}
                  </p>
                </div>
              </div>
              {RenderList}
              <div className="row">
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
                <div className="col-12 text-right">
                  <p className="text-body text-body font-weight-normal">
                    Total: {totals}
                  </p>
                </div>
                <div className="col-12">
                  <p className="text-body text-body font-weight-normal">
                    Payment: Cash
                  </p>
                </div>
              </div>
              <button
                className="btn btn-secondary btn-block"
                onClick={() => window.print()}
              >
                Print
              </button>
              <h5 className="text-center my-2">Or</h5>
              <button className="btn btn-primary btn-block">Send Email</button>
            </div>
          </div>
        </div>
      </div>
      <div id="section-to-print">
        <p className="text-center">
          RECEIPT EXAMPLE
          <br />#{detailData.order_number}
          <br />
          Cashier: {detailData.name}
        </p>
        <hr />
        <hr />
        <br />
        {RenderList}
        <hr />
        <p className="text-center">
          PPN10%: {ppns}
          <br />
          Total: {totals}
          <br />
          <hr />
          <hr />
          Thanks for your purchase!
          <br />
          MY STORE YOUR STORE
        </p>
      </div>
    </div>
  );
};

export default CheckoutModal;
