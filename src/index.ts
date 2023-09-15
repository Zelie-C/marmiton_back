import express, { Request } from 'express'
import 'dotenv/config'
import { Sequelize, DataTypes } from "sequelize";
import cors from 'cors';
import bodyParser from 'body-parser';


let app = express();
app.use(cors());
app.use(bodyParser.json());
const port = parseInt(process.env.PORT as string);


const username = process.env.USERNAME as string;
const password = process.env.PASSWORD as string;
const database = process.env.DATABASE as string;
const server= process.env.SERVER as string;


const sequelize = new Sequelize(database, username, password, {
  host: server,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  }
});


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
// Recette.sync({force: true})


interface IRequestBody {
  name: string,
  image: string,
  duration: string,
  note: string,
}

app.post('/recipes', async (req: Request<IRequestBody>, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let duration = req.body.duration;
  let note = req.body.note;
  const maRecette = await Recette.create({
    name: name,
    urlimage: image,
    duration: duration,
    note: note
  })
  res.json(maRecette)
})

app.delete('/recipes/:id', async (req, res) => {
  let idToDelete = req.params.id;
  await Recette.destroy({
    where: {
      id: idToDelete
    }
  });
  res.send('deleted')
})

app.get('/recipes', async (_, res) => {
  const allRecipes = await Recette.findAll();
  res.send(allRecipes)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
