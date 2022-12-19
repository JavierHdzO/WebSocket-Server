
import TicketControl from "../models/ticket-control.js";


const socketController = async(socket) => {
    /** Listening */
    await TicketControl.init();


    socket.emit('last-ticket', TicketControl.lastTicket);

    socket.on("next-ticket", async( payload, callback )=>{
        const next = await TicketControl.next();
        callback(next);
    });


    /** Emit */

    socket.emit();
}

export default socketController;