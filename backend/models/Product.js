const mongoosePaginate = require('mongoose-paginate-v2');

const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
    {
        price: {
            type: Number,
            required: true
        },
        onStock : {
            type: Boolean,
        },
        image : {
            type: String,
        },
        trackedBy:[
            {type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required :false
            }
        ],
        name :  {
            type: String,
            required: true
        },
        description : {
            type: String,
            required :true
        },
        usersTargetPrices: [{
            type: Map,
            of: String
        }],
        url : {
            type: String,
            required:true,
            unique:true
        }
    },
    { timestamps: true }
);
ProductSchema.plugin(mongoosePaginate);
ProductSchema.index({ description: 'text' ,name : 'text'});
export default mongoose.model("Product", ProductSchema);