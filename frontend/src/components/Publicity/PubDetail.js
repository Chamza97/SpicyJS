import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Dashbordadmin from "../../core/DashbordAdminLayout";
import { format } from "date-fns";

const PubDetail = () => {
  const [pub, setPub] = useState({
    name: "",
    description: "",
    date_debut: "",
    date_fin: "",
  });
  const dateFormatter = (date) => {
    return format(new Date(date), "dd/MM/yyyy");
  };
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const res = await axios.get(`http://localhost:8000/getonepub/${id}`);
    setPub(res.data);
  };

  return (
    <Dashbordadmin>
      <Link className="" to="/pub">
        <i class="fas fa-arrow-circle-left fa-3x"></i>
      </Link>
      <div class="content offset-lg-3">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-8">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title">Publicity Detail : </h4>
                  <h5 class="card-category">{pub.name}</h5>
                </div>
                <div class="card-body">
                  <hr />
                  <ul className="list-group w-60 ">
                    <li className="list-group-item">
                      <strong style={{ fontSize: "15px" }}>name:</strong>{" "}
                      {pub.name}
                    </li>
                    <li className="list-group-item">
                      <strong style={{ fontSize: "15px" }}>Description:</strong>{" "}
                      {pub.description}
                    </li>
                    <li className="list-group-item">
                      <strong style={{ fontSize: "15px" }}>Start date:</strong>{" "}
                      {dateFormatter(pub.date_debut)}
                    </li>
                    <li className="list-group-item">
                      <strong style={{ fontSize: "15px" }}>Fin date:</strong>{" "}
                      {dateFormatter(pub.date_fin)}
                    </li>
                    <li className="list-group-item">
                      {" "}
                      <img
                        className="offset-lg-4"
                        src={`/uploads/${pub.PubImage}`}
                        alt="..."
                        style={{ width: "30%", height: "30%" }}
                      />{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashbordadmin>
  );
};
export default PubDetail;
