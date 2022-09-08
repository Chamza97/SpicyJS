import  React, { useState } from 'react';
import './App.css';
import Layout from "../core/DashbordClientLayout";
import StripesContainer from './StripesContainer';
import avatar1 from "../assets/avatar1.png"
function Accueil() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showItem, setShowItem] = useState(false)
    return (
     <Layout> 
      <div className="App">
       
        {showItem ?  <StripesContainer/> : <>   <h3>to take advantage of our flash sales and advertising service</h3> 
        <img src={avatar1} alt="avatar" />
        <button onClick={() => setShowItem(true)}>buy 19$ per mouth</button></>}
      </div>
      </Layout>
    );
  }
  
  export default Accueil;