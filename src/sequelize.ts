import { Sequelize, DataTypes } from "sequelize";

const username = process.env.USERNAME as string;
const password = process.env.PASSWORD as string;
const database = process.env.PASSWORD as string;
const server= process.env.SERVE as string;

const sequelize = new Sequelize(database, username, password, {
  host: server,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
})

const recette = sequelize.define('Recette', {
  name: {
      type: DataTypes.STRING,
      allowNull: false
  },
  urlimage: {
      type: DataTypes.STRING,
      allowNull: false
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false
  }
})



export default sequelize;
