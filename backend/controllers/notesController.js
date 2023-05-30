const Note = require("../models/note");

const fetchNotes = async (req, res) => {
  // Obtener las notas
  const notes = await Note.find();

  // Respuesta en json
  res.json({ notes, success: "Listado de notas" });
};

const fetchNote = async (req, res) => {
  // Obtener ID mediante URL
  const noteId = req.params.id;

  // Encontrar la nota usando ID
  const note = await Note.findById(noteId);

  // Responder con la nota
  res.json({ note, success: "Nota obtenida por ID" });
};

const createNote = async (req, res) => {
  // Obtener los datos enviados
  const { title, body } = req.body;

  // Crear una nota con los datos
  const note = await Note.create({
    title,
    body,
  });

  // Responder con una nueva nota
  res.json({ note, success: "Nota creada" });
};

const updateNote = async (req, res) => {
  // Obtener ID mediante URL
  const noteId = req.params.id;

  // Obtener los datos de la petición
  const { title, body } = req.body;

  // Encontrar y actualizar la nota usando ID
  await Note.findByIdAndUpdate(noteId, {
    title,
    body,
  });

  // Encuentra la nota actualizada
  const note = await Note.findById(noteId);

  // Responder con la nota
  res.json({ note, success: "Nota actualizada" });
};

const deleteNote = async (req, res) => {
  // Obtener ID mediante URL
  const noteId = req.params.id;

  // Eliminar la nota
  await Note.deleteOne({ _id: noteId });

  // Responder con la nota
  res.json({ success: "Nota eliminada" });
};

module.exports = {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
};
