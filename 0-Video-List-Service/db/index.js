const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/videoList');
var db = mongoose.connection
mongoose.Promise = global.Promise
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', function() { 
  console.log('DATABASE OPEN'); 
});


const videoListSchema = new mongoose.Schema({
  videoID: String,
  videoName: String,
  channelTitle: String,
  thumbnail: String,
  })

const Video = mongoose.model('Video', videoListSchema);


let fetch = () =>{

  let query = Video.aggregate([{ $sample: { size: 10 } }] );
  return query.exec();

}

let save = (videos) => {
  console.log('save is running')

  for (var i = 0; i < videos.length; i++) {
    var current = videos[i]

    var data = new Video()
      data.videoID = current.id.videoId,
      data.videoName = current.snippet.title,
      data.channelTitle = current.snippet.channelTitle,
      data.thumbnail = current.snippet.thumbnails.default.url
      data.save(() => {})
  }
};






module.exports.db = db;
module.exports.mongoose = mongoose;
module.exports.fetch= fetch;
module.exports.save = save;
module.exports.Video = Video;