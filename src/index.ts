import express from 'express'
import 'dotenv/config'

let app = express();
const port = parseInt(process.env.PORT as string);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
