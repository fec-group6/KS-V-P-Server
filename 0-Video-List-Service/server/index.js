const express = require('express');
const app = express();
const db = require('../db/index.js')
app.use(express.static(__dirname + '/../client/dist'));


// will need to handle a get request to the database in order to retreive video info
//and display on our page.
app.get('/videos', (req, res)=>{

 db.fetch()
 .then((videos) => res.send(videos))
})



let port = 3000;

// app.listen(port, function() {
//   console.log(`listening on port ${port}`);
// });

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, function() {
  console.log(`listening on port ${port}`);
  });
}

module.exports = app;