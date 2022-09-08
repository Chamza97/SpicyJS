const mongoose = require("mongoose");

const userHistorySchema = new mongoose.Schema(
    {
        userId:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',required :true
            }
        ,
        name :  {
            type: String,
            required: true
        },
        brand : {
            type: String,
            required :true
        },
        price : {
            type: Number,
            required :true
        }
    },
    { timestamps: true }
);

export default  mongoose.model("History",userHistorySchema );
