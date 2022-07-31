import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import compression from "compression";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Compress all HTTP responses
app.use(compression({ memLevel: 1 }));
app.use(express.static("build"));

// sendFile will go here
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

app.listen(port);
console.log("Server started at http://localhost:" + port);
