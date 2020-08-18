import * as express from 'express'
import { Application } from 'express'
const cors = require('cors');

class App {

    public app: Application
    public port: number

    constructor(appInit: { port: number; routes: any; }) {
        this.app = express()
        this.port = appInit.port
        this.routes(appInit.routes)
    }

    private routes(route) {
        this.app.use('/api', route)
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}
export default App