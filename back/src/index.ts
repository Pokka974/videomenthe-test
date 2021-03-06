import cors from 'cors'
import express, { Application } from 'express'

import uploadRoute from './routes/upload.route'
import filesRoute from './routes/files.route'

const app: Application = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors())

app.use(express.static('tmp'))

app.use('/upload', uploadRoute)
app.use('/files', filesRoute)
// app.use("*", (req, res) => {
//      res.send('HELLO')
// })

app.listen(port, () => console.log('Watching port ' + port))