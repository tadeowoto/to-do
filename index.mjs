import express from 'express'
import { PORT } from './config/config.mjs'
import { TaskRouter } from './routes/tasks.mjs'
import { UserRouter } from './routes/user.mjs'
import { corsMiddleware } from './middlewares/cors.mjs'
import cookieParser from 'cookie-parser'
const app = express()

// Middlewares
app.use(express.json()) // Para leer el body de las peticiones
app.use(corsMiddleware) // cors
app.use(cookieParser())
app.use(express.urlencoded({ extended: true })) // Para leer datos de formularios
app.disable('x-powered-by') // Para que no aparezca el Nginx

app.set('view engine', 'pug') // Para que use pug como motor de plantillas
app.set('views', './views') // Para que use la carpeta views

app.use('/', UserRouter) // Para las rutas de usuarios
app.post('/register', UserRouter)
app.post('/login', UserRouter)
app.use('/tasks', TaskRouter)

app.listen(PORT, () => {
  console.log('Server started on port 3000')
})
