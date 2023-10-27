const bancoDados = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
//const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://cesar:rasec@tp2.bmv5w.mongodb.net/tp2?retryWrites=true&w=majority";
/*const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
const collection = client.db("tp2").collection("operacoes");
console.log("Conectado ao banco de dados")
// perform actions on the collection object
client.close();
});*/

bancoDados.connect(uri)
.then(conn => global.conn = conn.db("tp2"))
.catch(err => console.log(err))

function busqueTodas() {
return global.conn.collection("usuarios-sophya").find().toArray();
}

function salvar(usuario) {
return global.conn.collection("usuarios-sophya").insertOne(usuario);
}

function apagarUmaOperacao(id) {
return global.conn.collection("usuarios-sophya").deleteOne({ _id: ObjectId(id) });
}
module.exports = { busqueTodas, salvar, apagarUmaOperacao };