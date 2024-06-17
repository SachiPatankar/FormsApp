
import mongoose from "mongoose";

const infoSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,   
    },
    code: {
        type: String,
        required: true,   
    },
    number: {
        type: Number,
        required: true,   
    } 
});

const Info = mongoose.model("infos", infoSchema);

export { infoSchema, Info };
