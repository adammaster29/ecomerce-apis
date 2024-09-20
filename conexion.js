
// const config = {
//   server: "ADAM\\SQLEXPRESS",
//   database: "ECOMERCE",
//   options: {
//     encrypt: true,
//     trustServerCertificate: true,
//   },
//   authentication: {
//     type: "default",
//     options: {
//       userName: "sa",
//       password: "1234",
//     },
//   },
// };


// Configuración de la base de datos con variables de entorno para vercel
const config = {                       
    server: process.env.DB_SERVER || 'adamagudelo.database.windows.net',
    database: process.env.DB_DATABASE || 'ECOMERCE',
    options: {
        encrypt: true, // Requerido para Azure SQL
        trustServerCertificate: process.env.NODE_ENV !== 'production' // Asegúrate de manejar esto según el entorno
    },
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USER || 'adamagudelo',
            password: process.env.DB_PASSWORD || 'Appapis2024',
        }
    }
};

module.exports = config;
