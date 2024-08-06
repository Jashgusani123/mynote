const express = require('express');
const connectToMongo = require('./DataBaseConect'); 
var cors = require('cors')

connectToMongo();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });


// Define routes
app.use('/api/author', require('./routes/author'));
app.use('/api/notes', require('./routes/notes'));