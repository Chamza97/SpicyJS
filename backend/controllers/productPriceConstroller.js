
const productPriceService = require('../Service/ProductPriceService');
function addDays(day) {
    var date = new Date(day);
    date.setDate(date.getDate() + 1);
    return date;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push((new Date (currentDate)).toISOString().substring(0, 10));
        currentDate = addDays(currentDate);
    }
    return dateArray;
}
function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}
exports.getProductsPricesByIdProduct = (req, res, next) => {
    productPriceService.getAllByProduct(req.query.idProduct)
        .then((resp) => {
            let  dateprices = resp.map(({createdAt, price,onStock}) => ({createdAt, price,onStock}));
                const apiDates = dateprices.map(({ createdAt }) => {
                    current_date = new Date(createdAt)
                    const month = current_date.getMonth() +1
                    return current_date.getFullYear()+ "-" + month.toLocaleString('en-US', {
                        minimumIntegerDigits: 2,
                        useGrouping: false
                    })  + "-" + current_date.getDate().toLocaleString('en-US', {
                        minimumIntegerDigits: 2,
                        useGrouping: false
                    })
                });

                newPricesDate = [...new Set(apiDates)];
                const apiPrices =  dateprices.map(({ price }) => price)
                const onStockTab =  dateprices.map(({ onStock }) => onStock)

            const lastDate = newPricesDate[apiDates.length-1];
            const firstDate = newPricesDate[0];
            const days = getDates(new Date(firstDate),  sameDay(new Date(lastDate), new Date()) ?new Date(lastDate) : new Date());

            let values = [];
            let indexLastPrice = 1;

            values[0] = {date : days[0] , price : apiPrices[0] , onStock : onStockTab[0] };
            for(let i=1; i<days.length; i++) {
                if (apiDates[indexLastPrice ] == days[i]){
                    values[i] = {date : days[i] , price : apiPrices[indexLastPrice] , onStock : onStockTab[indexLastPrice] }
                    indexLastPrice ++;
                }else{
                    values[i] = {date : days[i] , price : apiPrices[indexLastPrice-1] , onStock : onStockTab[indexLastPrice-1] }
                }
            };
                res.json({ values})
            })
        .catch(err => next(err));
}
exports.deleteProductsPricesByIdProduct = (req, res, next) => {
    productPriceService.deleteByIDProduct(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
exports.createProductPrice = (req, res, next) => {
    productPriceService.isvalidProductURL(req.params.url)
        .then(() => res.json())
        .catch(err => next(err));
}
exports.createProductPrice = (req, res, next) => {
    productPriceService.isvalidProductURL(req.params.url)
        .then(() => res.json())
        .catch(err => next(err));
}





