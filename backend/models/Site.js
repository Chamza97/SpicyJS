const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema(
    {
        baseURL: {
            type: String,
            trim: true,
            required: true,
            max: 255,
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        tagsPrix: {
            type: [String],
        },
        tagsStock: {
            type: [String],
        }
    },
    { timestamps: true }
);

export default  mongoose.model("Site", siteSchema);

