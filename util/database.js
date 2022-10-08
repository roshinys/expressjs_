const Sequalize = require("sequelize");

const sequalize = new Sequalize("node-complete", "root", process.env.PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequalize;
