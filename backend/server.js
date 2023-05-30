// Cargar variables de env
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Importar dependencias
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");
const notesController = require("./controllers/notesController");
const usersController = require("./controllers/usersController");
const requireAuth = require("./middleware/requireAuth");

// Crear aplicación en express
const app = express();

// Configurar aplicación en express
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Conectar a base de datos
connectToDb();

// Enrutamiento
app.post("/signup", usersController.signup);
app.post("/login", usersController.login);
app.get("/logout", usersController.logout);
app.get("/check-auth", requireAuth, usersController.checkAuth);

app.get("/notes", notesController.fetchNotes);
app.get("/notes/:id", notesController.fetchNote);
app.post("/notes", notesController.createNote);
app.put("/notes/:id", notesController.updateNote);
app.delete("/notes/:id", notesController.deleteNote);

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log("Servidor iniciado en http://localhost:" + process.env.PORT);
});
