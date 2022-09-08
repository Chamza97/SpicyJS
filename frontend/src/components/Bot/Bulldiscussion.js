import React , {useState,useEffect} from "react";
import axios from "axios";
import DashbordClient from "../../core/DashbordClientLayout";
import "./bull.css";
import { isAuth } from "../../auth/helpers";
import {getProducts} from "../../actions/products.actions";
import {useDispatch, useSelector} from "react-redux";
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()
mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'
const Bulldiscussion = ()=> {
    const [isListening, setIsListening] = useState(false)
    const [note, setNote] = useState(null)
    const [savedNotes, setSavedNotes] = useState([])
    useEffect(() => {
        handleListen()
    }, [isListening])
    const handleListen = () => {
        if (isListening) {
            mic.start()
            mic.onend = () => {
                console.log('continue..')
                mic.start()
            }
        } else {
            mic.stop()
            mic.onend = () => {
                console.log('Stopped Mic on Click')
            }
        }
        mic.onstart = () => {
            console.log('Mics on')
        }
        mic.onresult = event => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')
            console.log(transcript)
            setState({ ...state,msg: transcript });
            mic.onerror = event => {
                console.log(event.error)
            }
        }
    }

    const uDispatch = useDispatch()
    const  initialState = {
        chat: [],
        msg: "",
        name: "",
        brand: "",
        price: "",
    };
    const  [name ,setName] =useState( "");
    const  [brand ,setBrand] =useState( "");
    const  [price ,setPrice] =useState( "");
    const [state ,setState] = useState( initialState)

    const  handleChange = (e) => {

        console.log(e.target.value);
        setState({ ...state,msg: e.target.value });
    };
    const handleSend = () => {

        if (state.msg != "") {
            axios
                .post("http://127.0.0.1:5000/user", { msg: state.msg })
                .then((res) => {
                    let ch = state.chat;
                    ch.push({ from: "our", msag: state.msg });
                    ch.push({ from: "cb", msag: res.data });

                    if (res.data !== "I am sorry, but I do not understand.")
                        if (res.data === "Do you have an exact brand") {
                            setName(state.msg )
                        } else if (res.data === "Please enter your average budget") {
                            setBrand( state.msg )
                        } else if (res.data === "please wait") {
                            uDispatch(getProducts(name,brand,state.msg))
                        }


                    setState({...state, chat: ch, msg: "" });
                    console.log(JSON.stringify(state));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div class="container">
            <div class="row">
                <div id="Smallchat">
                    <div class="Layout Layout-open Layout-expand Layout-right" style={{"background-color": "#3F51B5",color: "rgb(255, 255, 255)" , opacity: 5, "border-radius": "10px"}}>
                        <div class="Messenger_messenger">
                            <div class="Messenger_header" style={{"background-color": "rgb(22, 46, 98)", color: "rgb(255, 255, 255)"}}>
                                <h4 class="Messenger_prompt">How can we help you?</h4> <span class="chat_close_icon"><i class="fa fa-window-close" aria-hidden="true"></i></span> </div>
                            <div class="Messenger_content">
                                <div class="Messages">
                                    <div class="Messages_list">
                                        {state.chat && state.chat.map((msg) => {

                                            if (msg.from == "cb") {
                                                return (
                                                    <div class="chatbox__body__message chatbox__body__message--left">

                                                        <div class="chatbox_timing">
                                                            <ul>
                                                                <li><a href="#"><i class="fa fa-calendar"></i> 22/11/2018</a></li>
                                                                <li><a href="#"><i class="fa fa-clock-o"></i> 7:00 PM</a></li>
                                                            </ul>
                                                        </div>

                                                        <img src="assets/img/logosp.png" alt="Picture" />
                                                        <div class="clearfix"></div>
                                                        <div class="ul_section_full">
                                                            <ul class="ul_msg">
                                                                <li style={{color:"black"}}><strong>SpicyBot</strong></li>

                                                                <li style={{color:"black"}}>{msg.msag} </li>
                                                            </ul>
                                                            <div class="clearfix"></div>
                                                            <ul class="ul_msg2">
                                                                <li><a href="#"><i class="fa fa-pencil"></i> </a></li>
                                                                <li><a href="#"><i class="fa fa-trash chat-trash"></i></a></li>
                                                            </ul>
                                                        </div>

                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div class="chatbox__body__message chatbox__body__message--right">

                                                        <div class="chatbox_timing">
                                                            <ul>
                                                                <li><a href="#"><i class="fa fa-calendar"></i> 22/11/2018</a></li>
                                                                <li><a href="#"><i class="fa fa-clock-o"></i> 7:00 PM</a></li>
                                                            </ul>
                                                        </div>

                                                        <img src="https://www.gstatic.com/webp/gallery/2.jpg" alt="Picture" />
                                                        <div class="clearfix"></div>
                                                        <div class="ul_section_full">
                                                            <ul class="ul_msg">
                                                                {isAuth() && (
                                                                    <li style={{color:"black"}}><strong>{isAuth().name}</strong></li>
                                                                )}
                                                                <li style={{color:"black"}}>{msg.msag}</li>
                                                            </ul>
                                                            <div class="clearfix"></div>
                                                            <ul class="ul_msg2">

                                                                <><a href="#"><i class="fa fa-pencil"></i> </a></>
                                                                <li><a href="#"><i class="fa fa-trash chat-trash"></i></a></li>
                                                            </ul>
                                                        </div>

                                                    </div>
                                                );
                                            }
                                        })}


                                    </div>
                                </div>
                                <div class="Input Input-blank">
                                    <textarea className="Input_field" placeholder="Send a message..."  style={{height: "20px"}} value={state.msg} onChange={(e) => handleChange(e)} name="msg"/>
                                    <button class="Input_button Input_button-emoji"  type="button" onClick={() => setIsListening(prevState => !prevState)}>
                                        <div class="Icon" style={{width: "18", height: "18px"}}>

                                            <span>🎙️</span>
                                        </div>
                                    </button>
                                    <button class="Input_button Input_button-send" type="button"
                                            onClick={handleSend} >
                                        <div class="Icon" style={{width: "18px" , height: "18px"}}>
                                            <svg width="57px" height="54px" viewBox="1496 193 57 54" version="1.1"  style={{width: "18px", height: "18px"}}>
                                                <g id="Group-9-Copy-3" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(1523.000000, 220.000000) rotate(-270.000000) translate(-1523.000000, -220.000000) translate(1499.000000, 193.000000)">
                                                    <path d="M5.42994667,44.5306122 L16.5955554,44.5306122 L21.049938,20.423658 C21.6518463,17.1661523 26.3121212,17.1441362 26.9447801,20.3958097 L31.6405465,44.5306122 L42.5313185,44.5306122 L23.9806326,7.0871633 L5.42994667,44.5306122 Z M22.0420732,48.0757124 C21.779222,49.4982538 20.5386331,50.5306122 19.0920112,50.5306122 L1.59009899,50.5306122 C-1.20169244,50.5306122 -2.87079654,47.7697069 -1.64625638,45.2980459 L20.8461928,-0.101616237 C22.1967178,-2.8275701 25.7710778,-2.81438868 27.1150723,-0.101616237 L49.6075215,45.2980459 C50.8414042,47.7885641 49.1422456,50.5306122 46.3613062,50.5306122 L29.1679835,50.5306122 C27.7320366,50.5306122 26.4974445,49.5130766 26.2232033,48.1035608 L24.0760553,37.0678766 L22.0420732,48.0757124 Z" id="sendicon" fill="#96AAB4" fill-rule="nonzero"></path>
                                                </g>
                                            </svg>
                                        </div>
                                    </button>




                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="chat_on"> <span class="chat_on_icon"><i class="fa fa-comments" aria-hidden="true"></i></span> </div>

                </div>
            </div>
        </div>
    );

}
export default Bulldiscussion;
  
