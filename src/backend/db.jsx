import {MongoClient} from 'mongodb'

//Funcion dedicada a la creacion del cliente de MongoDB
async function connectToMongoDB() {
    // Coloca tu URI de MongoDB aquí
    const uri = "mongodb+srv://mariojoestar:contrasenia@cluster0.xexmwf4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri);
    try {
      // Conexión a la base de datos
      await client.connect();
      console.log("Conexión establecida correctamente");
      return client;
    } catch (error) {
      console.error("Error al conectar a MongoDB:", error);
      throw error; 
    }
  }

  export default connectToMongoDB;