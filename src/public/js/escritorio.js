const lblDesktop = document.querySelector('h1');
const btnCheckIn = document.querySelector('button');
const lblTicketCheckin = document.getElementById('ticket-check');
const divAlert = document.querySelector(".alert");
const lblTicketPending = document.getElementById('lblPendientes');
// const spanAlert = divAlert.firstElementChild;



const searchParams = new URLSearchParams( window.location.search );

if( !searchParams.has('desktop') ){
    window.location = 'index.html';
    throw new Error('desktop is required');
}

const desktop = searchParams.get('desktop');
lblDesktop.textContent = `Escritorio ${desktop}`
divAlert.style.display = 'none';

const socket = io();

socket.on("connect", ()=>{
    console.log("connected");
    btnCheckIn.disabled = false;
    lblTicketPending.textContent = "0";
});

socket.on("disconnect", ()=>{
    console.log("disconnected");
    btnCheckIn.disabled =  true;
    lblTicketPending.textContent = "-";
});

socket.on("tickets-pending", ( payload ) => {
    lblTicketPending.textContent = payload;
});


btnCheckIn.addEventListener('click', () => {

    socket.emit("ckeckin-ticket", { desktop }, ( {ok, msg, data} ) => {
        if( !ok ){
            return divAlert.style.display = '';
            // spanAlert.textContent = msg;

        }
        
        const { ticket } = data;
        lblTicketCheckin.textContent =`Ticket ${ticket.number}`;
        
    });
});