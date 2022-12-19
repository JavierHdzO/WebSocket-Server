import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    today:{
        type: String,
        default: (new Date()).toLocaleDateString()
    },
    last:{
        type: Number,
        default: 0
    },
    tickets:{
        type: Schema.Types.Array,
        default:[]
    },
    lastTickets:{
        type: Schema.Types.Array,
        default:[]
    }
    
});

export default model('Ticket', ticketSchema);