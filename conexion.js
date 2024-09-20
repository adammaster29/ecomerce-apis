
const config = {
  server: "ADAM\\SQLEXPRESS",
  database: "ECOMERCE",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  authentication: {
    type: "default",
    options: {
      userName: "sa",
      password: "1234",
    },
  },
};


module.exports = config;
