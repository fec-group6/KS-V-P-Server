const db = require('./index.js');
const Video= require('./index.js').Video;
const mongoose = require('mongoose');
const YOUTUBE_API_KEY = require('../YouTube-Data/YouTubeKey.js');
const axios = require('axios');

var retrieveVideos = ({query, max, key}, callback) => {
  axios.get(`https://www.googleapis.com/youtube/v3/search`, {
    params: {
      maxResults: max,
       q: query,
       part:'snippet',
       key: key,
       type: 'video',
       videoEmbeddable: 'true'
    }
  })
  .then(function (response) {
    db.save(response.data.items);
  })
  .catch(function (error) {
    console.log(error);
  });
};


retrieveVideos({query: 'dog friends', maxResults: 50, key: YOUTUBE_API_KEY.YOUTUBE_API_KEY}, db.save);
retrieveVideos({query: 'pet friends', maxResults: 50, key: YOUTUBE_API_KEY.YOUTUBE_API_KEY}, db.save);
retrieveVideos({query: 'puppies and kittens', maxResults: 50, key: YOUTUBE_API_KEY.YOUTUBE_API_KEY}, db.save);
retrieveVideos({query: 'cat fails', maxResults: 50, key: YOUTUBE_API_KEY.YOUTUBE_API_KEY}, db.save);
retrieveVideos({query: 'puppy fails', maxResults: 50, key: YOUTUBE_API_KEY.YOUTUBE_API_KEY}, db.save);
retrieveVideos({query: 'kitten fails', maxResults: 50, key: YOUTUBE_API_KEY.YOUTUBE_API_KEY}, db.save);
retrieveVideos({query: 'funny dogs', maxResults: 50, key: YOUTUBE_API_KEY.YOUTUBE_API_KEY}, db.save);
retrieveVideos({query: 'funny cats', maxResults: 50, key: YOUTUBE_API_KEY.YOUTUBE_API_KEY}, db.save);
retrieveVideos({query: 'dog flying', maxResults: 50, key: YOUTUBE_API_KEY.YOUTUBE_API_KEY}, db.save);
retrieveVideos({query: 'pet flying', maxResults: 50, key: YOUTUBE_API_KEY.YOUTUBE_API_KEY}, db.save);
retrieveVideos({query: 'dog animal friend', maxResults: 50, key: YOUTUBE_API_KEY.YOUTUBE_API_KEY}, db.save);
retrieveVideos({query: 'cat pet friend', maxResults: 50, key: YOUTUBE_API_KEY.YOUTUBE_API_KEY}, db.save);
retrieveVideos({query: 'puppybowl', maxResults: 20, key: YOUTUBE_API_KEY.YOUTUBE_API_KEY}, db.save);
retrieveVideos({query: 'singing cat', maxResults: 10, key: YOUTUBE_API_KEY.YOUTUBE_API_KEY}, db.save);
retrieveVideos({query: 'funniest dog', maxResults: 10, key: YOUTUBE_API_KEY.YOUTUBE_API_KEY}, db.save);
retrieveVideos({query: 'crazy pets', maxResults: 15, key: YOUTUBE_API_KEY.YOUTUBE_API_KEY}, db.save);
retrieveVideos({query: 'pet friends', maxResults: 10, key: YOUTUBE_API_KEY.YOUTUBE_API_KEY}, db.save);
retrieveVideos({query: 'funny pet friends', maxResults: 5, key: YOUTUBE_API_KEY.YOUTUBE_API_KEY}, db.save);
