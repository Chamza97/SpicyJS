import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashbordclient from "../../core/DashbordClientLayout";
import { isAuth } from "../../auth/helpers";
import { Link } from "react-router-dom";

const Userhistory = () => {
  const [history, setHistory] = useState([]);
  const [name, setName] = useState([]);
  const [brand, setBrand] = useState([]);
  const [price, setPrice] = useState([]);

  useEffect(() => {
    loadhistory();
  }, []);

  const loadhistory = async () => {
    let userId = isAuth()._id;
    const params = new URLSearchParams({
      userId: isAuth()._id,
    }).toString();
    const result = await axios
      .get("http://localhost:8000/api/user-history/get-all?" + params)
      .then(function (response) {
        console.log(response.data);
        setHistory(response.data.resp.reverse());
      });
  };

  return (
    <Dashbordclient>
      <div className="cards">
        <div className="container">
          <div class="title">
            <h3>Search history</h3>
          </div>
          <div className="row">
            {history.map((history, index) => (
              <div class="col-md-6 col-lg-4">
                <div class="card bg-info">
                  <div class="card-body " style={{ textAlign: "center" }}>
                    <h6 class="card-category ">
                      <i class="material-icons">attach_money</i> {history.price}
                    </h6>
                    <h4 class="card-title">
                      <Link
                        to={`/showhistoryprod/${history.name}/${history.brand}/${history.price}`}
                      >
                        &quot;{history.name} {history.brand}&quot;
                      </Link>
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Dashbordclient>
  );
};
export default Userhistory;
