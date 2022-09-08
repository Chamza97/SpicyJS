import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Dashbordadmin from "../../core/DashbordAdminLayout";
import { format } from 'date-fns'

const Pub = () => {
  const [pubs, setPubs] = useState([]);

  useEffect(() => {
    loadPubs();
  }, []);
  const dateFormatter = date => {
    return format(new Date(date), "dd/MM/yyyy");
};

  const loadPubs = async () => {
    const result = await axios.get("http://localhost:8000/getpub");
    setPubs(result.data.reverse());
  };

  const deletePub = async (id) => {
    await axios.delete(`http://localhost:8000/delete/${id}`);
    loadPubs();
  };

  return (
    <Dashbordadmin>
       <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">All Ads
                  <Link class="" style={{float:"right"}} to={`/addpub`}>
                  <i class="fa fa-plus-square " style={{}} aria-hidden="true"> NEW</i>
                  </Link>
                  </h4>
                  
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead class=" text-primary">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Date debut</th>
                        <th scope="col">Date fin</th>
                        <th scope="col">Image</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                       {pubs.map((pub, index) => (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{pub.name}</td>
                          <td>{pub.description}</td>
                          <td>{dateFormatter(pub.date_debut)}</td>
                          <td>{dateFormatter(pub.date_fin)}</td>
                          <td>
                            <img
                              src={`/uploads/${pub.PubImage}`}
                              alt="..."
                              style={{ width: "50px", height: "50px" }}
                            />
                          </td>
                          <td>
                            <Link
                              class="btn btn-primary mr-2"
                              to={`/pubdetail/${pub._id}`}
                            >
                              View
                            </Link>
                            <Link
                              class="btn btn-outline-primary mr-2"
                              to={`/editpub/${pub._id}`}
                            >
                              Edit
                            </Link>
                            <Link
                              class="btn btn-danger"
                              onClick={() => deletePub(pub._id)}
                            >
                              Delete
                            </Link>
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </Dashbordadmin>
  );
};
export default Pub;
