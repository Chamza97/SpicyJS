
import React, {useEffect, useState} from "react";
import {Card} from "@material-ui/core";
import {Modal , Button,InputGroup ,FormControl, Form ,FormCheck} from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import {
    AreaChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceArea,
    ReferenceLine,
    Area,
    Label
} from 'recharts';
import { format } from 'date-fns'
import {useDispatch} from "react-redux";
import {updateTargetPrice,addTargetPrice ,removeTargetPrice} from "../../actions/product.action";
const {isAuth} = require("../../auth/helpers");
const ShowProductPrices = (props) => {

    const uDispatch = useDispatch()
    const dataConverted = props.data.map(x =>{
        const date = new Date(x.date).getTime();
       return {onStock : x.onStock , price : x.price, date:date }
    } )


    const initTargetPrice = props.product && props.product.usersTargetPrices  &&
                            props.product.usersTargetPrices.filter(x=>x.user == isAuth()._id).length > 0?
                            props.product.usersTargetPrices.filter(x=>x.user == isAuth()._id)[0].targetPrice :-1



    const [data, setData] = useState(dataConverted);
    const [left, setLeft] = useState("dataMin");
    const [right, setRight] = useState("dataMax");
    const [top, setTop] = useState("dataMax+500");
    const [bottom, setBottom] = useState(0);
    const [animation, setAnimation] = useState(true);
    const [refAreaLeft, setRefAreaLeft] = useState("");
    const [refAreaRight, setRefAreaRight] = useState("");
    const [targetPrice, setTargetPrice] = useState(2600);
    const [hauteur, setHauteur] = useState(500);
    const [fixedTargetPrice, setFixedTargetPrice] = useState(initTargetPrice);
    const [gradientOff, setGradientOff] = useState(fixedTargetPrice/(Math.max(...data.map((i) => i.price))));
    const [showModal, setShowModal] = useState(false);
    const maxPrice = Math.max(...data.map(x=>x.price))+500;

    useEffect(()=>{
        const dataConverted = props.data.map(x =>{
            const date = new Date(x.date).getTime();
            return {onStock : x.onStock , price : x.price, date:date }
        } )
        setData(dataConverted)
        const initTargetPrice = props.product && props.product.usersTargetPrices  &&
        props.product.usersTargetPrices.filter(x=>x.user == isAuth()._id).length > 0?
            props.product.usersTargetPrices.filter(x=>x.user == isAuth()._id)[0].targetPrice :-1
        setFixedTargetPrice(initTargetPrice)
        setGradientOff(initTargetPrice/(Math.max(...dataConverted.map((i) => i.price))))

    },[ props])


    const getAxisYDomain = (from, to, ref, offset) => {
        const refData = data.slice(from - 1, to);

        Math.max.apply(null, refData );
        let [bottomRef, topRef] = [0, refData[0][ref]];

        refData.forEach((d) => {
            if (d[ref] > topRef) topRef = d[ref];
            if (d[ref] < bottomRef) bottomRef = d[ref];
        });

        return [(bottomRef | 0) - offset, (topRef | 0) + offset];
    };

    const dateFormatter = date => {
        return format(new Date(date), "dd/MMM");
    };


    const zoom = () => {
        if(!refAreaRight || !refAreaLeft ) {
            return
        }

        let myFrom = data.indexOf(data.find(x=>(x.date == refAreaLeft)));
        let myTo = data.indexOf(data.find(x=>(x.date == refAreaRight)));

        if(myFrom > myTo)  {
            const i = myFrom;
            myFrom =  myTo
            myTo = i
        }

        if (refAreaLeft === refAreaRight || refAreaRight === "") {
            setRefAreaLeft("");
            setRefAreaRight("");
            return;
        }

        // xAxis domain
        if (refAreaLeft > refAreaRight) {
            setRefAreaLeft(refAreaRight);
            setRefAreaRight(refAreaLeft);
        }
        // yAxis domain
        const [bottom, top] = getAxisYDomain(myFrom, myTo, "price", 1);
        setData(data.slice(myFrom,myTo));
        setLeft(refAreaLeft);
        setRight(refAreaRight);
        setBottom(bottom);
        setTop(top+(top/100*20))
        const toto  = fixedTargetPrice/Math.max(...data.slice(myFrom,myTo).map((i) => i.price))
        setGradientOff(toto)
    };

    const zoomOut = () => {
        setData(dataConverted)
        setRefAreaLeft("");
        setRefAreaRight("");
        setLeft("dataMin");
        setRight("dataMax");
        setTop("dataMax+200");
        setBottom(0);
        setGradientOff(fixedTargetPrice/(Math.max(...dataConverted.map((i) => i.price))))
    };
    const handleUpdate = () => {
        if(targetPrice< 0){
            toast.error("Target price Must be a positive number");
        }else{
            if(fixedTargetPrice >= 0){
                uDispatch(updateTargetPrice(props.product._id , targetPrice))
            }else{
                uDispatch(addTargetPrice(props.product._id , targetPrice))
            }
            setFixedTargetPrice(targetPrice)
            setGradientOff(targetPrice/(Math.max(...data.map((i) => i.price))))
        }
    }
    const handleRemove = () => {
        uDispatch(removeTargetPrice(props.product._id))
    }
    const CustomizedTooltip = ({ active, payload, label }) => {

        if (active && payload!= null) {
            const information = payload[0].payload
            return (
                <div className="chart-tooltip">
                    <div className="">
                        <span>date: {dateFormatter(information.date)}</span><br/>
                        <span>Price: {information.price} DT</span><br/>
                        {information.onStock && <span>Onstock: true</span>}
                        {!information.onStock && <span>Onstock: false</span>}
                    </div>

                </div>
            );
        }

        return null;
    };
    return (
        <div className="main main-raised " style={{marginTop:"40px"}}>
            <div className="row mt-3 ">
                <ToastContainer/>
                <div className="text-center col-10 mx-auto">
                    <Card>
                        <div className="row">
                            <div className="col-2">
                                <button
                                    className="btn update"
                                    onClick={zoomOut}
                                >
                                    Zoom Out
                                </button>
                            </div>
                            <div className="col-10">
                                <Form inline >
                                    <Form.Label htmlFor="inlineFormInputName2" srOnly>
                                        Target price
                                    </Form.Label>

                                    <InputGroup className="mb-2 mr-sm-2">
                                        <FormControl id="inlineFormInputName2" min={0} onChange ={e =>setTargetPrice(e.target.value)} type="number" placeholder="Target price" />
                                    </InputGroup>

                                    <Button onClick={handleUpdate} className="mb-2">
                                        Submit
                                    </Button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={handleRemove}
                                    >
                                        remove target price
                                    </button>
                                </Form>
                            </div>
                        </div>
                        <ResponsiveContainer width={'98%'} height={hauteur}>
                            <AreaChart
                                data={data}
                                onMouseDown={(e) => {
                                    if(e){
                                        setRefAreaLeft(e.activeLabel);
                                    }
                                }}
                                onMouseMove={(e,a) => {
                                    refAreaLeft && setRefAreaRight(e.activeLabel);
                                    e.isTooltipActive && setTargetPrice(maxPrice -((e.chartY-4.2)*(maxPrice/(hauteur-35))))
                                }}
                                onMouseUp={zoom}
                            >
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="1" x2="0" y2="0">
                                        <stop
                                            offset={gradientOff}
                                            stopColor={"green"}
                                            stopOpacity={1}
                                        />
                                        <stop
                                            offset={gradientOff}
                                            stopColor={"red"}
                                            stopOpacity={1}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="" />
                                <XAxis
                                    dataKey="date"
                                    domain={[left, right]}
                                    scale="time"
                                    type={"number"}
                                    tickFormatter={dateFormatter}
                                />
                                <YAxis
                                    allowDataOverflow
                                    domain={[bottom, top]}
                                    type="number"
                                    yAxisId="1"
                                    tickCount={6}
                                />
                                <Tooltip  cursor={false} content={<CustomizedTooltip />}/>
                                <Area
                                    yAxisId="1"
                                    type="monotoneY'"
                                    dataKey="price"
                                    stroke="#8884d8"

                                    animationDuration={300}
                                    fill="url(#colorUv)"
                                />
                                <ReferenceLine
                                    y={targetPrice}
                                    yAxisId="1"
                                    label={{fill:'#0000', value:(Math.round(targetPrice * 100)/100).toFixed(2) + " DT", position: "center", dy: 10}}
                                >
                                </ReferenceLine>
                                <ReferenceLine
                                    y={fixedTargetPrice}
                                    yAxisId="1"
                                    label={fixedTargetPrice + "DT"}
                                >

                                </ReferenceLine>
                                {refAreaLeft && refAreaRight ? (
                                    <ReferenceArea
                                        yAxisId="1"
                                        x1={refAreaLeft}
                                        x2={refAreaRight}
                                        strokeOpacity={0.3}
                                    />
                                ) : null}
                            </AreaChart>
                        </ResponsiveContainer>
                        <Modal show={showModal} animation={false}>
                            <Modal.Header >
                                <Modal.Title>Fix target price</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Woohoo, do you want to define {targetPrice} as a target price!</Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={() => setShowModal(false)}>
                                    No
                                </Button>
                                <Button variant="success" onClick={handleUpdate}>
                                    Yes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Card>
                </div>
            </div>
        </div>

    );
}
export default ShowProductPrices;