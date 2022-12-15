//referencias

const lbOnline  = document.getElementById('lbOnline');
const lbOffline = document.getElementById('idOffline');
const txtMessage= document.getElementById('txtMessage');
const btnSend   = document.getElementById('btnSend');


const socket = io();

socket.on("connect", ()=>{
    console.log('Conectado');
    lbOffline.setAttribute('hidden', true);
    lbOnline.removeAttribute('hidden', true);

    
});

socket.on("disconnect", ()=>{
    console.log('Desconectado');
    lbOnline.setAttribute('hidden', true);
    lbOffline.removeAttribute('hidden', true);
});

btnSend.addEventListener('click', ()=>{
    const payload =  txtMessage.value;
    
    socket.emit('send-message', payload, ( id ) => {
        console.log( id );
    });

});

socket.on('send-msg', ( args ) =>{
    console.log(args);
});