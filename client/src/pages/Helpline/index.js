import React, { useEffect } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { setPage } from "../../feature/user/authSlice";
import { helpline } from "../../constants";

const Helpline = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPage({ page: "helpline" }));
  }, []);
  return (
    <>
      <div className="dash-board">
        <div className="pet-heading">
          <h1>Helpline</h1>
        </div>

        <div className="petItemContainerr pet-care-info">
          {helpline && helpline?.map((item) => (
            <>
              <h1>{item?.organisation}</h1>
              <p><b>Address : </b>{item?.address}<br/><b>Contact Number : </b>{item?.number}</p>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Helpline;
