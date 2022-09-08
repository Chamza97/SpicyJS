import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashbordadmin from "../../core/DashbordClientLayout";

const promotion = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [pubs, setPubs] = useState([]);
// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(() => {
  loadPubs();
}, []);
const loadPubs = async () => {
  const result = await axios.get("http://localhost:8000/promotion/getpublicity");
  setPubs(result.data.reverse());
};
        return (
        <Dashbordadmin>
            <div className="col-md-4 main-product">
            {pubs.map((pub, index) => (
                <div className="card card-product card-plain">
                    
                    <div className="card-header card-header-image">
                 
                            <img src={`/uploads/${pub.PubImage}`} alt=""/>
                       
                        <div className="colored-shadow"
                        ></div>
                    </div>
                    <div className="card-body">
                        <h4 className="card-title">{pub.name}</h4>
                        <p className="card-description">{pub.description}</p>
                    </div>
                    <div className="card-footer">
                        <div className="price-container">
                            <span className="price price-new">{pub.date_debut}</span>
                        </div>
                        

                    </div>
                </div>
))}
            </div>
        </Dashbordadmin>
    );
}
export default  promotion;