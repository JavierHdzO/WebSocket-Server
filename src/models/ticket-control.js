import TicketBD from './ticket.js';

let ticketDB;
let instance;
let last = 0;
let today =(new Date()).toLocaleDateString();
let tickets =[];
let lastTickets =[];

class Ticket{

    constructor( number, desktop ){
        this.number = number;
        this.desktop = desktop;
    }

}

class TicketControl {

    constructor(){
        ticketDB = null;

        this.init();

        if(instance){
            throw new Error('Currently, TicketControl instance exists (You can just create one instance)');
        }

        instance = this;
    }

    get  getTickets(){
        const ticket = {
            "last": last,
            "today": today,
            "tickets": tickets,
            "lastTickets": lastTickets
        }
        return  ticket;
    }

    get lastTicket(){
        return last;
    }

    get lastFourTickets(){
        return lastTickets;
    }

    get ticketsLenght (){
        return tickets.length;
    }

    async init (){
        ticketDB = await TicketBD.findOne({
            today: (new Date()).toLocaleDateString()
        });

        
        if( ticketDB ){
            const {  last:lastT, tickets:ticketsT, lastTickets:lastTicketsT } = ticketDB;

            last = lastT;
            tickets = ticketsT;
            lastTickets = lastTicketsT
            return;
        }

        await this.createTicket();


    }

    async createTicket(){
        const ticketdb = new TicketBD();
        await ticketdb.save();
        ticketDB = ticketdb;
    }

    async saveDB(){
        ticketDB.last = last;
        ticketDB.tickets = tickets;
        ticketDB.lastTickets = lastTickets;

        await ticketDB.save();

    }


    async next(){
        last++;
        const ticket = new Ticket(last, null);
        tickets.push( ticket );

        await this.saveDB();

        return 'Ticket ' + last;
    }

    async checkInTicket( desktop ){
        if( tickets.length === 0 ){
            return null;
        }

        const ticket = tickets.shift();


        ticket.desktop = desktop;

        lastTickets.unshift(ticket);

        if(lastTickets.length > 4){
            lastTickets.splice(-1, 1);
        }

        await this.saveDB();

        return ticket;

    }

}

/** SigletonTicketControl  */

const sigletonTicketControl = Object.freeze(new TicketControl());


export default sigletonTicketControl;


// const TicketControl = {
//     getTickets(){
//     },
//     init(){
//     },
//     saveDB(){
//     }
// };

// Object.freeze(TicketControl);