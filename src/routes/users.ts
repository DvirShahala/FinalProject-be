import { createConnection } from "typeorm";
import { User } from "../entity/User";
import * as express from 'express'

const router = express.Router()


const options:any = {

    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "qwe123",
    database: "postgres",
    entities: [
        User
    ],
    synchronize: true,
    logging: false
}

// GET all users
router.get('/', async (req, res) => {

    await createConnection(options).then(async connection => {

        let userRepository = connection.getRepository(User);
        let loadedUsers = await userRepository.find();
        console.log(loadedUsers);

        res.send(loadedUsers);
        await connection.close();

    }).catch(error => console.log(error));
})

// GET specific user
router.get('/specific',(req,res)=> {
    createConnection(options).then(async connection => {
        
        let userRepository = connection.getRepository(User);  
        const loadedUser = await userRepository.find({ where: { email: req.query.email }});
        await connection.close();

        res.send(loadedUser);

    }).catch(error => console.log(error));
})

// POST user
router.post('/', async (req, res) => {

    createConnection(options).then(async connection => {

        let user = new User();
        user.email = req.body.email;
        user.fullName = req.body.fullName;
        user.password = req.body.password;

        let userRepository = connection.getRepository(User);

        await userRepository.save(user);
        await connection.close();

        res.send(user);

    }).catch(error => console.log(error));
})

export default router;