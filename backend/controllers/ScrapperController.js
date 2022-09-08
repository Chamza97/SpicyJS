import {io} from "../server";

const productService = require('../Service/ProductService')
const siteService = require('../Service/SiteService')
const productPriceService = require('../Service/ProductPriceService');
const notificationService = require('../Service/NotificationService');



export async function loadAllTrackedProductsPrices(){
    await productService.getTrackedProducts().then( products => {
        products.map(async product => {
             await siteService.getSiteByProductUrl(product.url).then(  site => {
                   productPriceService.getProductPriceFromWebSitePage(product.url,site.tagsPrix,site.tagsStock,async function (data) {
                        data.idProduct = product._id
                        console.log("sqd "+data.price,data.onStock );
                       var clients = io.sockets.adapter.rooms.get('Authenticated')

                        if(!data.price || data.onStock == null){
                            console.log(clients)
                            notificationService.getAdminUsers().then(async admins =>{

                                admins.map(admin => {
                                    notificationService.create(
                                        {
                                            User_id: admin._id,
                                            titre : "Product price scrapping failed",
                                            description : `failed to scrapp product with id :id${product._id} `
                                        }
                                    )
                                })
                            })
                                const sockets = await io.in("Authenticated").fetchSockets();
                                sockets.forEach(function(client) {
                                    notificationService.checkIfAdmin(client.handshake.auth.userId).then(isAdmin =>{
                                        console.log(client.handshake.auth,isAdmin)
                                        if(isAdmin ===true){
                                            console.log(client.handshake.auth)
                                                io.to(client.id).emit('resNotifications',[{
                                                    User_id: client.handshake.auth,
                                                    titre : "Product price scrapping failed",
                                                    description : `failed to scrapp product with id :id${product._id} `
                                                }] );
                                        }
                                    })
                                })
                        }else {
                            data.price = parseFloat(data.price.replace(/\s+/g, ''))
                            var log = "Product #"+product.id+" | Old price:"+product.price+" | New price:"+data.price;
                            console.log(product.onStock,data.onStock === product.onStock)
                            if (data && parseFloat(data.price.toFixed(2)) == parseFloat(product.price.toFixed(2)) && data.onStock === product.onStock ) {
                                log += " - No update";
                            } else {
                                log += " - Product price updated";
                                await productPriceService.create(data);
                                await productService.updatePrice(product._id, data.price, data.onStock)

                                product.usersTargetPrices.map((priceMap) =>{

                                    if(priceMap.get('targetPrice') >=data.price ){
                                        console.log("notttttttt")
                                        notificationService.create({
                                            User_id : priceMap.get('user'),
                                            titre : "Target price reached",
                                            description : `${product.name} is available for ${product.price} now id:${product._id}`
                                        })
                                    }
                                })
                            }
                            console.log(log)
                        }

                    })
                }
            )
        })
    })
}






