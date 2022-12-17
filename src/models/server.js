import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';

import dbConnection from '../database/config.js';
import socketController from '../sockets/controller.js';
import Ticket from './ticket.js';

class Serve {

    constructor(){
        // Server var
        this.app    =  express();

        // Socket.io
        this.httpServer = createServer(this.app);
        this.io     = new Server(this.httpServer);
        

        //Environment vars
        this.PORT = process.env.PORT || 0;

        // Paths
        this.PATHS = {
            
        };

        // Conection to Database
        this.database();

        //Middlewares
        this.middlewares();

        // Routes of server
        this.routes();

        // Sockets
        this.sockets();

    }
    
    async database(){
        await dbConnection();
        const ticket = new Ticket();
        ticket.save();
    }

    middlewares(){
        this.app.use(cors());

        /**Static files  */
        const { pathname } =  new URL('../public', import.meta.url);
        this.app.use( express.static(pathname.substring(1)) );
    }

    routes(){
        
    }

    sockets(){
        this.io.on("connection", socketController );

    }


    listen(){
        this.httpServer.listen(this.PORT, ()=>{
            console.log(`Server Listen on Port ${this.PORT}`);
        });
    }

}

export default Serve;
