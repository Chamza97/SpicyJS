import React , { useState, useEffect } from "react";
import axios from "axios";
import ClientDashbordLayout from "../../core/DashbordAdminLayout";
const Dashbordadmine = () => {
    const [numberResult, setNumber] = useState([]);
    const [number, setnumberuser] = useState([]);
    const [subscriber, setsubscriber] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:8000/statis/statistiquepre").then(result => {
        console.log(result.data)
        setNumber(result.data);
      });
      
      }, []);
     
      useEffect(() => {
        axios.get("http://localhost:8000/statis/statistique").then(result => {
          console.log(result.data)
          setnumberuser(result.data);
        });
        
        }, []);
       
        useEffect(() => {
          axios.get("http://localhost:8000/statis/statistiquesubscri").then(result => {
            console.log(result.data)
            setsubscriber(result.data);
          });
          
          }, []);
       
      
  return (
    <ClientDashbordLayout>
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <div class="card-icon">
                    <i class="material-icons">content_copy</i>
                  </div>

                  <h6 >User premium </h6>
                  <h3 class="card-title">
                  {numberResult && <p>{numberResult}</p>}
                    
                  </h3>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons text-danger">warning</i>
                    <a href="javascript:;">Get More Space...</a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 col-sm-6">
    <div class="card card-stats">
      <div class="card-header card-header-warning card-header-icon">
        <div class="card-icon">
          <i class="material-icons">content_copy</i>
        </div>
        <h6 >User registration </h6>
        <h3 class="card-title">
        {number && <p>{number}</p>}
          
        </h3>
      </div>
      <div class="card-footer">
        <div class="stats">
          <i class="material-icons text-danger">warning</i>
          <a href="javascript:;">Get More Space...</a>
        </div>
      </div>
    </div>
  </div>

  <div class="col-lg-3 col-md-6 col-sm-6">
    <div class="card card-stats">
      <div class="card-header card-header-warning card-header-icon">
        <div class="card-icon">
          <i class="material-icons">content_copy</i>
        </div>
        <h6 >User Subscriber </h6>
        <h3 class="card-title">
        {subscriber && <p>{subscriber}</p>}
          
        </h3>
      </div>
      <div class="card-footer">
        <div class="stats">
          <i class="material-icons text-danger">warning</i>
          <a href="javascript:;">Get More Space...</a>
        </div>
      </div>
    </div>
  </div>

          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="card card-chart">
                <div class="card-header card-header-success">
                  <div class="ct-chart" id="dailySalesChart"></div>
                </div>
                <div class="card-body">
                  <h4 class="card-title">Daily Sales</h4>
                  <p class="card-category">
                    <span class="text-success">
                      <i class="fa fa-long-arrow-up"></i> 55%{" "}
                    </span>{" "}
                    increase in today sales.
                  </p>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">access_time</i> updated 4 minutes
                    ago
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-chart">
                <div class="card-header card-header-warning">
                  <div class="ct-chart" id="websiteViewsChart"></div>
                </div>
                <div class="card-body">
                  <h4 class="card-title">Email Subscriptions</h4>
                  <p class="card-category">Last Campaign Performance</p>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">access_time</i> campaign sent 2
                    days ago
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-chart">
                <div class="card-header card-header-danger">
                  <div class="ct-chart" id="completedTasksChart"></div>
                </div>
                <div class="card-body">
                  <h4 class="card-title">Completed Tasks</h4>
                  <p class="card-category">Last Campaign Performance</p>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">access_time</i> campaign sent 2
                    days ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientDashbordLayout>
  );
};
export default Dashbordadmine ;
