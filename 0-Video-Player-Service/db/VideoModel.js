const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  numberOfDislikes: { type: Number, default: 0 },
  numberOfLikes: { type: Number, default: 0 },
  title: String,
  videoYouTubeId: String,
  videoOwnerId: String,
  videoOwnerUsername: String,
  videoThumbnailURL: String,
  videoURL: String,
  viewCount: { type: Number, default: 0 },
  videoIndex: Number
}, { timestamps: { createdAt: 'created_at' } });

const VideoModel = mongoose.model('Video', videoSchema);

module.exports = VideoModel;
