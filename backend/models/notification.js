

const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
    {
       
        User_id:
            {type: mongoose.Schema.Types.ObjectId, ref: 'User',required :true}
        ,
        titre :  {
            type: String,
            required: true
        },
        description : {
            type: String,
            required :true
        }
    },
    { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);