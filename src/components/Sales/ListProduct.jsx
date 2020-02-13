import React from "react";

const ListProducts = ({ data, selectedProduct }) => {
  const RenderList = data.map(products => {
    const onClickHandler = () => {
      selectedProduct(products);
    };
    function formatNumber(num) {
      return "Rp. " + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
    return (
      <div
        className="col-sm-4 mb-4"
        key={products.id}
        onClick={onClickHandler}
        style={{ cursor: "pointer" }}
      >
        <div className="card bg-transparent border-0">
          {products.image !== "" ? (
            <img
              src={products.image}
              className="card-img-top shadow"
              alt={products.name}
            />
          ) : (
            <img
              src="/assets/image/noimage.jpg"
              className="card-img-top shadow"
              alt={products.name}
            />
          )}
          <div className="card-body p-0">
            <h6 className="card-title font-weight-normal my-2">
              {products.name}
            </h6>
            <h6 className="card-title font-weight-bold m-0">
              {formatNumber(products.price)}
            </h6>
          </div>
        </div>
      </div>
    );
  });

  return <>{RenderList}</>;
};

export default ListProducts;
