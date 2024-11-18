// models/MateriaInscripta.js
module.exports = (sequelize, DataTypes) => {
    const MateriaInscripta = sequelize.define('MateriaInscripta', {
      idInscripcion: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      idMateria: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    MateriaInscripta.associate = (models) => {
      MateriaInscripta.belongsTo(models.Inscripcion, { foreignKey: 'idInscripcion' });
      MateriaInscripta.belongsTo(models.Materias, { foreignKey: 'idMateria' });
    };
  
    return MateriaInscripta;
  };
  
