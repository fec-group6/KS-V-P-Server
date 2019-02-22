const request = require('request')
const path = require('path')
const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000;

const VIDEO_PLAYER_SERVICE_URL = 'http://fec-ks-video-player.hussx9vrbw.us-west-2.elasticbeanstalk.com';
const VIDEO_LIST_SERVICE_URL = 'http://video-list-service-dev.us-west-2.elasticbeanstalk.com';
const COMMENTS_SERVICE_URL = 'http://comments-service-dev.us-west-2.elasticbeanstalk.com';

// const VIDEO_PLAYER_SERVICE_URL = 'http://localhost:3001';
// const VIDEO_LIST_SERVICE_URL = 'http://localhost:3002';
// const COMMENTS_SERVICE_URL = 'http://localhost:3003';

app.get('/', (req, res) => {
  console.log(`Serving GET request on path: ${req.path}`)
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/video-player-service/api/get-video', (req, res) => {
  console.log(`Serving GET request on path: ${req.path}`)
  request(`${VIDEO_PLAYER_SERVICE_URL}/video-player-service/api/get-video`, function (serviceError, serviceResponse, serviceResponseBody) {
    res.send(serviceResponseBody)
  })
})

app.get('/video-player-service/assets/:asset', (req, res) => {
  console.log(`Serving GET request on path: ${req.path}`)
  request(`${VIDEO_PLAYER_SERVICE_URL}/assets/${req.params.asset}`, function (serviceError, serviceResponse, serviceResponseBody) {
    res.setHeader('Content-Type', 'text/css');
    res.send(serviceResponseBody)
  })
})

app.get('/video-list-service/assets/:asset', (req, res) => {
  console.log(`Serving GET request on path: ${req.path}`)
  request(`${VIDEO_LIST_SERVICE_URL}/assets/${req.params.asset}`, function (serviceError, serviceResponse, serviceResponseBody) {
    res.setHeader('Content-Type', 'text/css');
    res.send(serviceResponseBody)
  })
})

app.get('/comments-service/assets/:asset', (req, res) => {
  console.log(`Serving GET request on path: ${req.path}`)
  request(`${COMMENTS_SERVICE_URL}/assets/${req.params.asset}`, function (serviceError, serviceResponse, serviceResponseBody) {
    res.setHeader('Content-Type', 'text/css');
    res.send(serviceResponseBody)
  })
})

app.get('/video-list-service/get-video-list', (req, res) => {
  console.log(`Serving GET request on path: ${req.path}`)
  request(`${VIDEO_LIST_SERVICE_URL}/get-video-list`, function (serviceError, serviceResponse, serviceResponseBody) {
    res.setHeader('Content-Type', 'text/css');
    res.send(serviceResponseBody)
  })
})

app.get('/comments-service/watch/details', (req, res) => {
  console.log(`Serving GET request on path: ${req.path}`)
  request(`${COMMENTS_SERVICE_URL}/watch/details?id=1&currUser=testUser`, function (serviceError, serviceResponse, serviceResponseBody) {
    res.setHeader('Content-Type', 'text/css');
    res.send(serviceResponseBody)
  })
})

app.get('*', (req, res) => {
  console.log(`Serving GET request on path: ${req.path}`)
  res.status(404).send('This page does not exist! Please try another URL, or go back to home page!')
})

const server = app.listen(PORT, () => { console.log(`Proxy listening on port ${PORT}!`) })

module.exports = server;