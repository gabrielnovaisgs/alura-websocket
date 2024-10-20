import { findDocumentByName, updateDocument } from "./documentsDb.ts";
import { io } from "./server.ts";
interface DocComunication {
  text: string;
  docName: string;
}

io.on("connection", (socket) => {
  socket.on("texto_editor", async (obj: DocComunication) => {
    const updated = await updateDocument({
        documentName: obj.docName,
        text: obj.text
    })
    if (updated.modifiedCount === 0) return;
   
    socket.to(obj.docName).emit("texto_editor_clientes", obj.text);
  });

  socket.on("selecionar_documento", async (nomeDocumento, callback) => {
    socket.join(nomeDocumento);

    const doc = await findDocumentByName(nomeDocumento);
    if (!doc) return;
    callback(doc.text);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnect");
  });
});
