import React, { useContext } from "react";
import GlobalState from "../../../../GlobalState";
import { Link } from "react-router-dom";

const BtnRender = ({ product, deleteProduct }) => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <>
      <div>
        <div className="row_btn">
          {isAdmin ? (
            <>
              <Link
                id="btn_delete"
                to="#!"
                onClick={deleteProduct(product._id, product.images.public_id)}
              >
                Delete
              </Link>
              <Link id="btn_edit" to={`/edit_product/${product._id}`}>
                Edit
              </Link>
            </>
          ) : (
            <>
              <Link id="btn_view" to={`/detail/${product._id}`}>
                View
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BtnRender;
