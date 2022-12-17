
import ticketControl from "../models/ticket-control.js";


const socketController = async(socket) => {
    /** Listening */
    console.log(socket.id);
    await ticketControl.init();
    const tickets = ticketControl.getTickets;
    console.log(tickets);

    socket.on("send-message", ( payload, callback )=>{
        
        socket.broadcast.emit('send-msg', payload);

        const id = 12345;

        callback(id);



    });


    /** Emit */

    socket.emit();
}

export default socketController;