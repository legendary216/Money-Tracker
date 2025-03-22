import {Schema,model} from "mongoose";

const transactionSchema = new Schema({
    name : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    },

    description : {
        type: String,
        required : true
    },

    datetime : {
        type : Date,
        required : true
    }
})

export const TransactionModel = model('Transaction', transactionSchema)