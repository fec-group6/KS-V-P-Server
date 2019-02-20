const db = require('./index.js'); // we only need this file to start our connection
const VideoModel = require('./VideoModel.js');
const mongoose = require('mongoose');
const request = require('request')
const YOUTUBE_API_KEY = require('../config/youtube.config.js')

const createRequestParameters = (apiEndpoint, partToSearch, queryString, youTubeApiResponse) => {
  const result = {
    url: `https://www.googleapis.com/youtube/v3/${apiEndpoint}`,
    type: 'GET',
    qs: {
      part: partToSearch,
      key: YOUTUBE_API_KEY,
      q: queryString || '',
      maxResults: 50,
      order: 'viewCount',
      id: ''
    }
  };

  if (youTubeApiResponse) {
    let parsedBody = JSON.parse(youTubeApiResponse);
    parsedBody.items.forEach((video, index, allVideos) => {
      result.qs.id += video.id.videoId;
      if (index < allVideos.length - 1) {
        result.qs.id += ','
      }
    })
  }

  return result;
}

var transformRawYouTubeAPIData = function (arrayOfCombinedVideos) {
  let result = [];

  arrayOfCombinedVideos.forEach((video, index) => {
    var newVideo = {
      numberOfDislikes: video.statistics.dislikeCount,
      numberOfLikes: video.statistics.likeCount,
      title: video.snippet.title,
      videoYouTubeId: video.id,
      videoOwnerId: video.snippet.channelId,
      videoOwnerUsername: video.snippet.channelTitle,
      videoThumbnailURL: video.snippet.thumbnails.default.url,
      videoURL: `https://www.youtube.com/embed/${video.id}`,
      viewCount: video.statistics.viewCount,
      videoIndex: index
    };
    result.push(newVideo);
  });

  return result
}

const processBothCatsAndDogsData = function (videosApiResponseCatsRAW, videosApiResponseDogsRAW) {
  const parsedCats = JSON.parse(videosApiResponseCatsRAW);
  const parsedDogs = JSON.parse(videosApiResponseDogsRAW);

  const joinAllVideos = parsedCats.items.concat(parsedDogs.items)
  const transformedVideosArr = transformRawYouTubeAPIData(joinAllVideos);

  VideoModel.deleteMany({})
    .then(() => {
      console.log('Video collection removed before seeding to avoid duplication!')

      VideoModel.create(transformedVideosArr)
        .then(() => {
          console.log('Database seeded. Closing db connection!')
          mongoose.disconnect();
        });
    })
}

VideoModel.find({}, function (err, data) {
  if (data.length === 100) {
    console.log('No need to seed DB! We already have 100 videos saved!');
    mongoose.disconnect();
    return
  }

  //First search for Cats (we can only get 50 videos maximum at one time)
  const searchSearchApiOptionsCats = createRequestParameters('search', 'snippet', 'Funny Cats', null);
  request(searchSearchApiOptionsCats, function (err, res, searchApiResponseCats) {
    //Now search for Cats video details - we need videoIds from the searchApi (previous step)
    const searchVideosApiOptionsCats = createRequestParameters('videos', 'statistics,snippet', '', searchApiResponseCats)
    request(searchVideosApiOptionsCats, function (err, res, videosApiResponseCats) {

      //Now search for Dogs to get the next 50 videos
      const searchSearchApiOptionsDogs = createRequestParameters('search', 'snippet', 'Funny Dogs', null);
      request(searchSearchApiOptionsDogs, function (err, res, searchApiResponseDogs) {

        //Now search for Dog video details - we need videoIds from the searchApi (previous step)
        const searchVideosApiOptionsDogs = createRequestParameters('videos', 'snippet,statistics', '', searchApiResponseDogs)
        request(searchVideosApiOptionsDogs, function (err, res, videosApiResponseDogs) {
          processBothCatsAndDogsData(videosApiResponseCats, videosApiResponseDogs)
        });
      });
    });
  });
})
