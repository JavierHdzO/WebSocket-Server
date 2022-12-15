


const socketController = (socket) => {
    /** Listening */
    console.log(socket.id);

    socket.on("send-message", ( payload, callback )=>{
        
        socket.broadcast.emit('send-msg', payload);

        const id = 12345;

        callback(id);

    });


    /** Emit */

    socket.emit();
}

export default socketController;