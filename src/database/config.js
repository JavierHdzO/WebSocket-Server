import { connect, set } from 'mongoose';

set('strictQuery', false);
const connection = async ()=>{
    try {
        await connect(process.env.MONGODB_CNN);
        console.log('Database is connected');
    } catch (error) {
        console.log(error);
    }
}

export default connection;