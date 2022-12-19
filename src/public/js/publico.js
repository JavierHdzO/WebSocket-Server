
const lblTickets = document.querySelectorAll('.ticket');
const lblDesktop = document.querySelectorAll('.desktop');

const socket = io();

socket.on('connect', ()=>{
    console.log('connected');
});

socket.on('disconnect', ()=>{
    console.log('disconnected');
});

socket.on('current-status', ( payload ) => {
    

    for (let i = 0; i < lblTickets.length; i++) {
        lblTickets[i].textContent = `Ticket ${ payload[i].number || "X" }`;
        lblDesktop[i].textContent = `Desktop ${payload[i].desktop.desktop}` || "Desktop X";
        
    }

});