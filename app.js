const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const config = require('./conexion');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


const app = express();

// Configuración de Swagger
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API de productos AdamAgudelo',
        version: '1.0.0',
        description: 'Documentación de la API del ECOMERCE',
      },
      servers: [
        {
          url: 'http://localhost:3000', // URL en producción o local
        },
      ],
    },
    apis: ['./app.js'], // Rutas donde se documentan los endpoints
  };
  
  const swaggerSpecs = swaggerJsdoc(swaggerOptions);
  
  // Ruta de la documentación
  app.use('/adamagudelo', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
  



app.use(cors());
app.use(express.json());

app.use('/images', express.static('public/img'));






/**
 * @swagger
 * components:
 *   schemas:
 *     productos:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         titulo:
 *           type: string
 *           example: "Reloj diamantes"
 *         descripcion:
 *           type: string
 *           example: "Reloj de diamantes plata fondo azul masculino"
 *         img:
 *           type: string
 *           example: "/images/reloj-azul.png"
 *         precio:
 *           type: number
 *           format: float
 *           example: 159900.99"
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtiene todos los productos
 *     responses:
 *       200:
 *         description: Lista de todos los productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/productos'
 */

// buscar productos
app.get('/productos', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        console.log('conexion exitosa');
        const result = await pool.request().query('SELECT * FROM productos');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error con el servidor:', error);
        res.status(500).send('Error en el servidor');
    }
});



/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtiene un producto por id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Detalles del producto.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/productos'
 *       404:
 *         description: producto no encontrado
 */

// buscar productos por id
app.get('/productos/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).send('El ID debe ser un número');
    }

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('producto_id', sql.Int, id)
            .query('SELECT * FROM productos WHERE id = @producto_id');

        if (result.recordset.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.recordset[0]);
        }
    } catch (err) {
        console.error('Error al obtener el producto:', err);
        res.status(500).send('Error al obtener el producto');
    }
});

// const port = 3000;
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});
