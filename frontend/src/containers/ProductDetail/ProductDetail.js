import Dropdown from "react-bootstrap/Dropdown";
import {Button, ButtonGroup} from "react-bootstrap";
import ProductRecommendationContainer from "../products.recommendation.container/product.recommendation.container";
import React, {useState} from "react";
import styled from "styled-components";
import {getPriceCurrency} from "../../services/product.service";


export const ProductDetail = (props) => {
    const [priceCurency , setPriceCurrency] = useState("DT");
    const toto = props.product.price
    const [price , setPrice] = useState(props.product.price);

    const Img = styled.img`
      background: transparent;
      max-width: 300px;
      height: auto;
      vertical-align: middle;`
    const Price= styled.h3`text-align: left;`

    const handleOnSelect = (event )=> {
        if(event === 'TND'){
            setPrice(props.product.price.toFixed(2))
        }else{
            getPriceCurrency(event,props.product.price).then(data => {
                const currency = data.results.TND_EUR ?  data.results.TND_EUR.val:data.results.TND_USD.val
                setPrice((currency *  toto).toFixed(2))
            })
        }
        switch (event){
            case "USD" : setPriceCurrency("$");break
            case "EUR" : setPriceCurrency("€");break
            default  : setPriceCurrency("TND")
        }
    }
    return (


            <div >
                <div style={{margin: "0vh 0px 0px"}} className="main main-raised ">
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <div className="tab-content">
                                <div className="tab-pane active show" >
                                    <Img src={props.product.image} alt="hamza"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <h2 className="title"> {props.product.name}
                            </h2>
                            <Price className="main-price">{price}
                                <Dropdown onSelect={(e)=>handleOnSelect(e)} size="sm" as={ButtonGroup}>

                                    <Button style={{background:"transparent" ,color:"black" , boxShadow:"none",cursor:"text",fontSize:"22px",
                                        paddingTop:"0",paddingRight:"0"}}>{priceCurency}</Button>

                                    <Dropdown.Toggle  style={{background:"transparent" ,color:"black" , boxShadow:"none",cursor:"text",fontSize:"22px"}}
                                                      split id="dropdown-split-basic" />

                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="EUR" >Euro</Dropdown.Item>
                                        <Dropdown.Item eventKey="USD" >Dollars</Dropdown.Item>
                                        <Dropdown.Item eventKey="TND" >DT</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <br/>
                                {!props.product.onStock ? <span className="badge badge-pill badge-warning">Out of Stock</span> :
                                    <span className="badge badge-pill badge-success">on Stock</span>
                                }
                            </Price>
                            <div id="accordion" role="tablist">
                                <div className="card card-collapse">
                                    <div className="card-header" role="tab" id="headingOne">
                                        <h5 className="mb-0">
                                            <a data-toggle="collapse"  aria-expanded="true"
                                            >
                                                Description
                                            </a>
                                        </h5>
                                    </div>
                                    <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne"
                                    >
                                        <div className="card-body">
                                            <p> {props.product.description}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="card card-collapse">
                                    <div className="card-header" role="tab" id="headingThree">
                                        <h5 className="mb-0">
                                            <a  data-toggle="collapse" aria-expanded="true"
                                                aria-controls="collapseThree">
                                                Details
                                            </a>
                                        </h5>
                                    </div>
                                    <div id="collapseThree"
                                         data-parent="#accordion">
                                        <div className="card-body">
                                            <ul style={{padding:"0"}}>

                                                {props.product.trackedBy.length > 0 &&
                                                <li  style={{listStyle:"none"}}>
                                                    <a style={{padding:"0"}} className=" btn btn-link btn-github" >
                                                        Tracked by : {props.product.trackedBy.length} users
                                                    </a>
                                                </li>
                                                }
                                                <li style={{listStyle:"none",}}>
                                                    <button  style={{padding:"0"}} className=" btn btn-link btn-github" >
                                                        Seller :  <span className="badge badge-pill badge-rose">
                                {props.product.url.match(/^https?:\/\/[^#?\/]+/)[0].replace("https://", "").toLowerCase()}
                              </span>
                                                    </button>
                                                </li>
                                                <li style={{listStyle:"none"}}>
                                                    <a style={{padding:"0"}} className=" btn btn-link btn-youtube" href={props.product.url}>
                                                        View in original web site
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ProductRecommendationContainer/>
            </div>

    )
}