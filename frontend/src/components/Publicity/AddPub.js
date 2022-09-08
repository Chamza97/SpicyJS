import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Dashbordadmin from "../../core/DashbordAdminLayout";

const AddPub = () => {
  let history = useHistory();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [dated, setDated] = useState("");
  const [datef, setDatef] = useState("");
  const [fileName, setFileName] = useState("");

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  const changeOnclick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("dated", dated);
    formData.append("datef", datef);
    formData.append("pubImage", fileName);

    axios.post("http://localhost:8000/insert", formData);
    history.push("/pub");
  };

  return (
    <Dashbordadmin>
      <Link className="" to="/pub">
        <i class="fas fa-arrow-circle-left fa-3x"></i>
      </Link>
      <div class="content offset-lg-3 ">
        <div class="container-fluid ">
          <div class="row ">
            <div class="col-md-8">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title">Add Publicity</h4>
                </div>
                <div class="card-body ">
                  <form onSubmit={changeOnclick} encType="multipart/form-data">
                    <div className="form-group ">
                      <div class="form-group col-md-12 ">
                        <label>Name :</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter Pub Name"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div class="form-group col-md-12 ">
                        <label>Description</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter description"
                          name="desc"
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div class="form-group col-md-12 ">
                        <label>Start date</label>
                        <input
                          type="date"
                          className="form-control form-control-lg"
                          placeholder="Enter start date"
                          name="dated"
                          value={dated}
                          onChange={(e) => setDated(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div class="form-group col-md-12 ">
                        <label>End date</label>
                        <input
                          type="date"
                          className="form-control form-control-lg"
                          placeholder="Enter fin date"
                          name="datef"
                          value={datef}
                          onChange={(e) => setDatef(e.target.value)}
                        />
                      </div>
                    </div>

                    <div class="custom-file">
                      <input
                        type="file"
                        class="custom-file-input"
                        id="customFileLang"
                        lang="es"
                        filename="pubImage"
                        onChange={onChangeFile}
                      />
                      <label class="custom-file-label" for="customFileLang">
                        Upload image here
                      </label>
                    </div>

                    <div class="form-group col-md-12 ">
                      <button className="btn btn-primary btn-block">
                        Update Pub
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashbordadmin>
  );
};
export default AddPub;
