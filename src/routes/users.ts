import { createConnection } from "typeorm";
import { User } from "../entity/User";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import * as fs from "fs";

const cookieParser = require("cookie-parser");
const router = express.Router();
const RSA_PRIVATE_KEY = fs.readFileSync("src/routes/private.key");

const options:any = {
    url: process.env.DATABASE_URL,
    type: 'postgres',
    entities: [
        "src/entity/**/*.ts"
     ],
    synchronize: true
}


// GET all users
router.get('/', async (req, res) => {

    await createConnection(options).then(async connection => {

        let userRepository = connection.getRepository(User);
        let loadedUsers = await userRepository.find();

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

// POST login
router.post("/login", (req, res) => {

  createConnection(options)
    .then(async (connection) => {

      const emailUser = req.body.email;
      const passwordUser = req.body.password;

      let userRepository = connection.getRepository(User);
      const loadedUser = await userRepository.find({
        where: { email: emailUser, password: passwordUser },
      });
      await connection.close();

      if (loadedUser.length != 0) {
        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
          algorithm: "RS256",
          expiresIn: 120,
          subject: emailUser
        });
        res.status(200).json({
          idToken: jwtBearerToken, 
          expiresIn: 120
        });

      } else {
        // Send status 401 Unauthorized
        res.sendStatus(401);
      }
    })
    .catch((error) => console.log(error));
});

export default router;