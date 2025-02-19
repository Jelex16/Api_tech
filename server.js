require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Configurar conexión con la base de datos
const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
});

app.use(cors());
app.use(express.json());

app.get('/talleres', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM talleres');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener los talleres:', error);
        res.status(500).json({ error: 'Error al obtener los talleres' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
