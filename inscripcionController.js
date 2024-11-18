// controllers/InscripcionController.js
const { Inscripcion, MateriaInscripta, Materias } = require('../models');

module.exports = {
  // Crear una nueva inscripción
  async createInscripcion(req, res) {
    const { anioInscripcion, idEstudiante, idCarrera, materias } = req.body;

    try {
      // Crear la inscripción
      const inscripcion = await Inscripcion.create({
        anioInscripcion,
        idEstudiante,
        idCarrera
      });

      // Asociar las materias a la inscripción
      const materiasInscripta = materias.map((materiaId) => ({
        idInscripcion: inscripcion.id,
        idMateria: materiaId
      }));

      // Crear las materias inscritas
      await MateriaInscripta.bulkCreate(materiasInscripta);

      res.status(201).json({ message: 'Inscripción creada con éxito', inscripcion });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear inscripción', error });
    }
  },

  // Obtener todas las inscripciones
  async getInscripciones(req, res) {
    try {
      const inscripciones = await Inscripcion.findAll({
        include: [
          { model: Materias, through: MateriaInscripta },
          { model: Estudiantes }, // Esto asume que tienes el modelo Estudiantes
          { model: Carreras }    // Asumiendo que tienes el modelo Carreras
        ]
      });

      res.status(200).json(inscripciones);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las inscripciones', error });
    }
  },

  // Obtener detalles de una inscripción específica
  async getInscripcionById(req, res) {
    const { id } = req.params;

    try {
      const inscripcion = await Inscripcion.findOne({
        where: { id },
        include: [
          { model: Materias, through: MateriaInscripta },
          { model: Estudiantes },
          { model: Carreras }
        ]
      });

      if (!inscripcion) {
        return res.status(404).json({ message: 'Inscripción no encontrada' });
      }

      res.status(200).json(inscripcion);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la inscripción', error });
    }
  }
};
