const express = require('express');
const routes = require('./src/routes');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('UI')
})

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});