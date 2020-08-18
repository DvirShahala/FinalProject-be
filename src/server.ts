import App from './app'
import router from './routes/routes'

const app = new App({
    port: 3000,
    routes: router,
})

app.listen()