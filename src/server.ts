// @deno-types="npm:@types/express@4"
import express from "express";
import process from "node:process";
import url from "node:url";
import path from "node:path";
import http from "node:http";
import { Server } from "socket.io";
import "./dbConnection.ts";
const app = express();
const port = process.env.PORT || 3000;

const currentPath = url.fileURLToPath(import.meta.url);
const publicDFolder = path.join(currentPath, "../..", "public");

app.use(express.static(publicDFolder));

const httpServer = http.createServer(app);
const host = '0.0.0.0'
httpServer.listen(
  port,
host,
  () => console.log(`Server running on http://${host}:${port}`),
);

export const io = new Server(httpServer);
