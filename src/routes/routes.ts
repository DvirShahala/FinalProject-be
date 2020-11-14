import { Router } from "express";
import User from "./users";
<<<<<<< Updated upstream

const { Pool } = require('pg');
=======
import { Pool } from 'pg';

>>>>>>> Stashed changes
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const router = Router();

router.use('/users', User);

export default router;