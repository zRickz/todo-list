import express from 'express'
import cors from 'cors'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import listTasks from './routes/tasks/list'
import createTask from './routes/tasks/create'
import deleteTask from './routes/tasks/delete'
import updateTask from './routes/tasks/update'
import csrfPage from './routes/csrf'

const app = express()
const csrfProtect = csrf({cookie: true})

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())


mongoose.connect('<MONGODB_URL_HERE').then(() => 
    console.log('Banco de dados conectado com sucesso!')
).catch(() => console.log('Erro ao se conectar com o banco de dados...'))

// Rotas
app.use('/token', csrfProtect, csrfPage)
app.use('/tasks', csrfProtect, listTasks)
app.use('/tasks', csrfProtect, createTask)
app.use('/tasks', csrfProtect, updateTask)
app.use('/tasks', csrfProtect, deleteTask)

export default app
