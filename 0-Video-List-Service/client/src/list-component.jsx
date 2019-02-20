import React from 'React';
import Video from './NewVideo.jsx';

const VideoList = (props) => (
  <div className="video-list">
    {props.videos.map(video =>
      <Video video={video}/>
    )}
    <button className='show-more-btn' onClick = {props.onClick}>SHOW MORE</button>
  </div>
);




export default VideoList;