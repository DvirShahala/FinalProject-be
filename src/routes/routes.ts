import { Router } from "express";
import User from "./users";
import { createConnection } from "typeorm";


const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

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

router.use('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      //res.render('pages/db', results );
      res.status(200);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

export default router;