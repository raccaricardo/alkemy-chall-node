const { sequelize } = require('../database/config.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false
  },
  active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
  }

}, {
  // Other model options go here
    timestamps: false
});



module.exports = User;