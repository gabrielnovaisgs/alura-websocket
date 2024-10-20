import { documentsCollection } from "./dbConnection.ts";

async function findDocumentByName(documentName: string) {
  const document = await documentsCollection.findOne({
    name: documentName,
  });
  console.log(documentName, document);
  return document;
}

async function updateDocument(
  { documentName, text }: { documentName: string; text: string },
) {
  const updated = documentsCollection.updateOne({
    name: documentName,
  }, {
    $set: {
      text: text,
    },
  });

  return updated
}

export { findDocumentByName, updateDocument };
