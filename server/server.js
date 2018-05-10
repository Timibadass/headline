//Install express server
const express = require('express');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/public'));

// Start the app by listening on the default Heroku port
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname  + '/public/index.html');
});