const Sequalize = require("sequelize");

const sequalize = require("../util/database");

const User = sequalize.define("user", {
  id: {
    type: Sequalize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequalize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequalize.STRING,
    allowNull: false,
  },
});

module.exports = User;
