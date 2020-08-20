import App from './app'
import router from './routes/routes'
import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'


const app = new App({
    port: 3000,
    routes: router,
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})

app.listen()