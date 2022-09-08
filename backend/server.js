import {getNotificationByUser} from "./Service/NotificationService";
const notificationService  = require('./Service/NotificationService')
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cron = require('node-cron');
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const PubModel = require("./models/pub");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const user = require("./models/user");
const puppeteer = require('puppeteer');
const app = express();
var Request = require("request");
var socket = require('socket.io')
import {updateUserRole} from "./controllers/profil";

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.options('*', cors());
//connect to db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

//import routes
const authRoutes = require("./routes/auth");
const promotion =require("./routes/publicity");
const pubRoutes = require("./routes/pub");
const profiluser = require("./routes/profil");
const productsRoutes = require("./routes/product");
const productsPriceRoutes = require("./routes/ProductPrice");
const siteRouter = require("./routes/sites");
const statistique=require("./routes/statistique");
const notificationsRouter = require("./routes/notification");
const historyRouter = require("./routes/UserHistory");
const {loadAllTrackedProductsPrices} = require("./controllers/ScrapperController");
const botRoutes = require("./routes/bot");

//app middlewares
app.use(morgan("dev")); //morgan to see the different request status
app.use(express.json()); //fel version 4.16 express bodyParser became deprecated
//app.use(cors()); //cors to allow all origins, sometimes i might want to restrict access to it so i have to configure it further
// here i'll be enabling cors cause my backend runs on port 8000 and the frontend on port 3000 in development, but in production
// i'll disable it cause both frontend n backend will use same domain name
if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: `http://localhost:3000` }));
}
 // load products prices
 // every minute  * * * * *
cron.schedule('0 12 * * *', () => {
	loadAllTrackedProductsPrices()
    console.log('prices crapped');
});
// Runs 8 AM on every Sunday
cron.schedule('0 8 * * 0', () => { 
	Request("http://127.0.0.1:5000/mytek", (error, response, body) => {
    if(error) {
        return console.log("erreur");
    }
    console.log("Mytek Spider has has been run successfully");
	});
});
// Runs 9 AM on every Sunday
cron.schedule('0 9 * * 0', () => { 
	Request("http://127.0.0.1:5000/tunisianet", (error, response, body) => {
    if(error) {
        return console.log("erreur");
    }
    console.log("tunsianet Spider has has been run successfully");
	});
});

//middleware
app.use("/api", authRoutes);
app.use("/api/product",productsRoutes)
app.use("/api/prices",productsPriceRoutes)
app.use("/api/site",siteRouter)
app.use("/", pubRoutes);
app.use("/profil", profiluser);
app.use("/api/notifications", notificationsRouter);
app.use("/api/user-history", historyRouter);
app.use("/bot",botRoutes)
app.use("/promotion",promotion)
app.use("/statis", statistique);
app.use(express.static(path.resolve(__dirname, '../frontend/build')));


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});
const port = process.env.PORT || 8000;
var server = app.listen(port, () => {
  console.log(
    `API is running on port ${port} --- ${process.env.NODE_ENV} --- client url : ${process.env.CLIENT_URL} --- API: ${process.env.SENDGRID_API_KEY}`
  );
});

 export let io = socket(server, {
	cors: {
		origin: "http://127.0.0.1:8000",
		methods: ["GET", "POST"]
	}
});
io.on('connect', async function (socket) {
	console.log(socket.handshake.auth)
	console.log("connected")
	if(socket.handshake.auth.userId != null){
		socket.join('Authenticated')
		socket.emit('resNotifications',await notificationService.getNotificationByUser(socket.handshake.auth.userId))
	}
	socket.on('userConnected',async function (from) {

		socket.join('Authenticated')
		console.log('signin ', from, ' saying ', socket.handshake);
		console.log(io.engine.clientsCount,io.sockets.adapter.rooms)
		socket.emit('resNotifications',await notificationService.getNotificationByUser(socket.handshake.auth.userId))
	});

	socket.on('userDisconnected', function (from) {

		socket.leave('Authenticated')
		console.log('logout ', from);

		console.log(io.engine.clientsCount,io.sockets.adapter.rooms)
	});
	socket.on('disconnect', () => {
		console.log("socket disconnected , ",socket.id)
	});

	console.log(io.engine.clientsCount,io.sockets.adapter.rooms)
});


function message (userId, event, data) {
	io.sockets.to(userId).emit(event, data);
}

// payment 
app.post("/payment", cors(), async (req, res) => {
	let { amount, id ,userId } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "premium",
			payment_method: id,
			confirm: true
		})
		updateUserRole(userId,"premium").then(resp =>{
			console.log("Payment", payment)
			res.json({
				message: "Payment successful",
				success: true
			})
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
});

