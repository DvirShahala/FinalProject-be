import { Router } from "express";
import User from "./users";

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const router = Router();

router.use('/users', User);

export default router;