import * as express from 'express'
import { Application } from 'express'
const cors = require('cors');


class App {


    public app: Application
    public port: number

    constructor(appInit: { port: number; middleWares: any; routes: any; }) {
        this.app = express()
        this.port = appInit.port
        this.middlewares(appInit.middleWares)
        this.routes(appInit.routes)
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        this.app.use(cors());
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
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