import express from 'express'
import 'dotenv/config'
import { Sequelize, DataTypes } from "sequelize";



let app = express();
const port = parseInt(process.env.PORT as string);


const username = process.env.USERNAME as string;
const password = process.env.PASSWORD as string;
const database = process.env.PASSWORD as string;
const server= process.env.SERVE as string;
const connexion= process.env.CONNECTION_STRING as string


const sequelize = new Sequelize(connexion)


async function connexionTest() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connexionTest();

const Recette = sequelize.define('Recette', {
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
  },
}, {
  timestamps: false
});

Recette.sync()

// app.get('/', async (_, res) => {
//   res.send('OK')
// })

app.post('/recipe/create/:name/:image/:duration/:note', async (req, res) => {
  let name = req.params.name;
  let image = req.params.image;
  let duration = req.params.duration;
  let note = req.params.note;
  await Recette.create({
    name: name,
    urlimage: image,
    duration: duration,
    note: note
  })
  res.send('ok')
})

app.delete('/recipe/delete/:id', async (req, res) => {
  let idToDelete = req.params.id;
  await Recette.destroy({
    where: {
      id: idToDelete
    }
  });

  res.send('deleted')
})

app.get('/recipe/getallrecipe', async (_, res) => {
  const allRecipes = await Recette.findAll();
  res.send(allRecipes)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
