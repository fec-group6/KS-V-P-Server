const request = require('request')
const express = require('express')
const app = express()

const port = require('../config/portNumbers.config.js');

app.use(express.static('public'))

app.get('/video-player-service-proxy', (req, res) => {
  const urlRoot = req.get('host').split(':')[0]
  const fullUrl = 'http://' + urlRoot + ':' + port.videoPlayer +'/video-player-service/api/get-video';
  request(fullUrl, function (error, response, body) {
    res.send(200, body)
  });
})

app.get('/video-player-service/api/get-video', (req, res) => {
  res.redirect('/video-player-service-proxy')
})

app.get('/video-player/bundle.js', (req, res) => {
  const urlRoot = req.get('host').split(':')[0]
  const fullUrl = 'http://' + urlRoot + ':' + port.videoPlayer +'/bundle.js';
  request(fullUrl, function (error, response, body) {
    res.send(200, body)
  });
})

app.get('/video-player/style.css', (req, res) => {
  const urlRoot = req.get('host').split(':')[0]
  const fullUrl = 'http://' + urlRoot + ':' + port.videoPlayer +'/style.css';
  request(fullUrl, function (error, response, body) {
    res.send(200, body)
  });
})
// app.get('/video-list/bundle.js', (req, res) => {
// })

// app.get('/comments/bundle.js', (req, res) => {
// })


// catch-all
app.get('*', (req, res) => {
  console.log(`Serving GET request on path: ${req.path}`)
  res.send(404, 'This page does not exist! Please try another URL, or go back to home page!')
})
const server = app.listen(port.proxy, () => { console.log(`Proxy listening on port ${port.proxy}!`) })

module.exports = server;