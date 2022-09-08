const mongoose = require("mongoose");

const ProductPriceSchema = new mongoose.Schema(
    {
        idProduct : {
            type: String,
            required : true
        },
        price: Number,
        onStock : {
            type: Boolean,
        },
    },
    { timestamps: true }
);

export default mongoose.model("ProductPrice", ProductPriceSchema);
