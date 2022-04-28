import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import uploadRoute from './routes/upload.route'
import filesRoute from './routes/files.route'

const app: Application = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/upload', uploadRoute)
app.use('/files', filesRoute)
// app.use("*", (req, res) => {
//      res.send('HELLO')
// })

app.listen(port, () => console.log('Watching port ' + port))