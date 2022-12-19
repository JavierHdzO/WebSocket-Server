const lblNewTicket = document.querySelector("#lblNuevoTicket");
const btnCreateTiket = document.querySelector("button");

const socket = io();

socket.on("connect", ()=>{
    console.log("conncted");
    btnCreateTiket.disabled = false;
});

socket.on("disconnect", ()=>{
    console.log("disconnect");
    btnCreateTiket.disabled = true;
});


socket.on("last-ticket", ( payload ) => {
    console.log(payload);

    lblNewTicket.textContent = "Sin cola"
    if(payload !== 0){
        lblNewTicket.textContent = `Ticket ${payload}`
    
    }

});



btnCreateTiket.addEventListener("click", (  )=>{
     socket.emit("next-ticket", null , ( ticket )=>{
        lblNewTicket.innerText = ticket;
    });
});
