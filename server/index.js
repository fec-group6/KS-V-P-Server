const request = require('request')
const path = require('path')
const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000;

const VIDEO_PLAYER_SERVICE_URL = 'http://fec-ks-video-player.hussx9vrbw.us-west-2.elasticbeanstalk.com/';

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/video-player-service/api/get-video', (req, res) => {
  request(`${VIDEO_PLAYER_SERVICE_URL}video-player-service/api/get-video`, function (serviceError, serviceResponse, serviceResponseBody) {
    res.send(serviceResponseBody)
  })
})

app.get('/video-player-service/assets/:asset', (req, res) => {
  request(`${VIDEO_PLAYER_SERVICE_URL}/assets/${req.params.asset}`, function (serviceError, serviceResponse, serviceResponseBody) {
    res.setHeader('Content-Type', 'text/css');
    res.send(serviceResponseBody)
  })
})

app.get('*', (req, res) => {
  console.log(`Serving GET request on path: ${req.path}`)
  res.status(404).status('This page does not exist! Please try another URL, or go back to home page!')
})

const server = app.listen(PORT, () => { console.log(`Proxy listening on port ${PORT}!`) })

module.exports = server;