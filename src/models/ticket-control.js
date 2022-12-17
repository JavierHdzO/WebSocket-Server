import Ticket from './ticket.js';

let instance;
let last = 0;
let today =new Date().getDate();
let tickets =[];
let lastTickets =[];

class TicketControl {

    constructor(){
        
        this.init();

        if(instance){
            throw new Error('Currently, TicketControl instance exists (You can just create one instance)');
        }

        instance = this;
    }

    

    get  getTickets(){
        const ticket = {
            "last": this.last,
            "today": this.today,
            "tickets": this.tickets,
            "lastTickets": this.lastTickets
        }
        return  ticket;
    }

    async init (){
        const ticket = await Ticket.find();

        last = ticket[0].last,
        today = ticket[0].today,
        tickets = ticket[0].tickets,
        lastTickets = ticket[0].lastTickets
    }

    async saveDB(){
        
    }
}

/** SigletonTicketControl  */

const sigletonTicketControl = Object.freeze(new TicketControl());

export default sigletonTicketControl;