import { Collection, Document, MongoClient } from "mongodb";
// connection string mongodb://[username:password@]host[/[defaultauthdb][?options]]
const client = new MongoClient(
  "mongodb://root:senha@localhost:27017/",
);

let documentsCollection: Collection<Document>;
try {
  await client.connect();
  const db = client.db("alura-documentos");
  documentsCollection = db.collection("documentos");

  console.log("Database Connected");
} catch (erro) {
  console.log(erro);
}

export { documentsCollection };
