const Sequalize = require("sequelize");

const sequalize = require("../util/database");

const Product = sequalize.define("product", {
  id: {
    type: Sequalize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequalize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequalize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequalize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequalize.DOUBLE,
    allowNull: false,
  },
});

module.exports = Product;
