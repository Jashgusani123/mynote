const express = require('express');
const connectToMongo = require('./DataBaseConect'); 
var cors = require('cors')
const path = require('path');

connectToMongo();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'mynote/build')));


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'mynote', 'build', 'index.html'));
});



app.use(cors())
app.use(express.json())
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });


// Define routes
app.use('/api/author', require('./routes/author'));
app.use('/api/notes', require('./routes/notes'));