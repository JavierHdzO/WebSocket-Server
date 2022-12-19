
import TicketControl from "../models/ticket-control.js";


const socketController = async(socket) => {
    /** Listening */
    await TicketControl.init();
    console.log(TicketControl.getTickets);

    
    socket.on("next-ticket", async( payload, callback )=>{
        const next = await TicketControl.next();
        callback(next);
    });
    
    
    socket.on("ckeckin-ticket", async( payload, callback ) => {

        const { desktop } = payload;
        if( !desktop ){
            return callback({
                ok: false,
                msg:"Desktop is required"
            });
        }

        const ticket = await TicketControl.checkInTicket( payload );

        socket.broadcast.emit('current-status', TicketControl.lastFourTickets);
        socket.emit('tickets-pending', TicketControl.ticketsLenght);
        socket.broadcast.emit('tickets-pending', TicketControl.ticketsLenght);

        
        if( !ticket ){
            return  callback({
                ok:false,
                msg:"There are not tickets pending"
            });
        }

        callback( {
            ok:true,
            data:{
                ticket
            }
        } );
    });

    /** Emit */
    socket.emit('last-ticket', TicketControl.lastTicket);
    socket.emit('current-status', TicketControl.lastFourTickets);
    socket.emit('tickets-pending', TicketControl.ticketsLenght);
}

export default socketController;