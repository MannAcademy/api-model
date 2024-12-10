const express = require('express');
const modelRoutes = require('./routes'); // Import routes

const app = express();
const port = process.env.PORT || 8080;

app.use('/model', modelRoutes); // Gunakan routes

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});