const mongoose = require("mongoose");
const username = "inventariosApp";
const password = "j8B0Fl47j8wtiSvO";
const cluster = "cluster0.iaexicp.mongodb.net";
const dbName = 'inventario';
let uri =
    `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;

class MongoLib {
    // @ts-ignore
    private client: mongoose;
    private dbname: string;
    private static connection: Promise<unknown>;
    constructor() {
        this.client = mongoose;
        this.dbname = dbName;
    }
    connect() {
        if (!MongoLib.connection) {
            this.client.set('strictQuery', true);
            MongoLib.connection = mongoose.connect(uri).then(() => {
                console.log("conexion a mongo")
            }).catch((e: Error) => {
                console.log("conexion a mongo error: " + e)
            })
        }
        return MongoLib.connection;
    }
    close() {
        this.client.close();
    }
}
const mongo = new MongoLib();
export default mongo;
