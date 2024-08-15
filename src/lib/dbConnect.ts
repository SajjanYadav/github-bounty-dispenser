import mongoose, { mongo } from "mongoose";

//database ke connection ke bad jo object aa raha hai to hame usme se kya chahiye uska datatype hamne diya hai
type ConnectionObject = {
    isConnected?: number         // ? is used to state that datatype is optional
}

const connection: ConnectionObject = {}  // an object wiht type connection is created and able to kept empty  because of "?"

async function dbConnect() : Promise<void> {
    if(connection.isConnected){
        console.log("Already Connected to Database")
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "")
        
        connection.isConnected = db.connections[0].readyState    // connections is an array that is returned and its first value gives us the readyState

        console.log("Connected to Database is Success")
    } catch (error) {
        console.log("Database not connected")
        process.exit(1)
    }
    

}

export default dbConnect;