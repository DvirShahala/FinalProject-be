import { Router } from "express";
import User from "./users";
import { createConnection } from "typeorm";

const router = Router();

// createConnection({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "qwe123",
//     database: "postgres",
//     entities: [
//         User
//     ],
//     synchronize: true,
//     logging: false
// }).then(connection => {
//     // here you can start to work with your entities
// }).catch(error => console.log(error));

router.use('/users', User);

export default router;