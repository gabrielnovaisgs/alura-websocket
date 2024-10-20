const socket = io();

const textArea = document.getElementById("editor-texto");

const params = new URLSearchParams(window.location.search);
const docName = params.get("nome");
const docTitle = document.getElementById("titulo-documento");

docTitle.textContent = docName;

socket.emit("selecionar_documento", docName, (text) => {
  textArea.value = text;
});

textArea.addEventListener("keyup", () => {
  socket.emit("texto_editor", { text: textArea.value, docName: docName });
});

socket.on("texto_editor_clientes", (text) => {
  textArea.value = text;
});
