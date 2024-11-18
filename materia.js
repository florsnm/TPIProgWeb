// models/Materia.js
module.exports = (sequelize, DataTypes) => {
    const Materia = sequelize.define('Materias', {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      idCarrera: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    Materia.associate = (models) => {
      Materia.belongsTo(models.Carreras, { foreignKey: 'idCarrera' });
      Materia.hasMany(models.MateriaInscripta, { foreignKey: 'idMateria' });
    };
  
    return Materia;
  };
  
