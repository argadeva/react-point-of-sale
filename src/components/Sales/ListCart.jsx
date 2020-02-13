import React from "react";

const ListCart = ({ list, plusProduct, minProduct }) => {
  const RenderCart = list.map(cartList => {
    const handlePlus = () => {
      plusProduct(cartList.id);
    };
    const handleMin = () => {
      minProduct(cartList.id);
    };
    function formatNumber(num) {
      return "Rp. " + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
    return (
      <div className="card mb-3 border-0" key={cartList.id}>
        <div className="row no-gutters">
          <div className="col-md-3">
            {cartList.image !== "" ? (
              <img
                src={cartList.image}
                className="card-img-top"
                alt={cartList.name}
              />
            ) : (
              <img
                src="/assets/image/noimage.jpg"
                className="card-img-top"
                alt={cartList.name}
              />
            )}
          </div>
          <div className="col-md-9">
            <div className="card-body py-0 pl-2">
              <h5 className="card-title mb-0">{cartList.name}</h5>
              <small className="text-danger">
                Only left {cartList.stock} Pcs
              </small>
            </div>
            <div className="cartbutton pl-2">
              <div className="row">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-outline-success rounded-0"
                    onClick={handleMin}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success rounded-0"
                    disabled
                  >
                    {cartList.qty}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success rounded-0"
                    onClick={handlePlus}
                  >
                    +
                  </button>
                </div>
                <div className="d-flex align-content-center flex-wrap mr-3">
                  <div className="float-right">
                    {formatNumber(cartList.price * cartList.qty)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <>{RenderCart}</>;
};

export default ListCart;
