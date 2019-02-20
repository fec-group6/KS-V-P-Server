import React from 'React';


const Video = (props)=> (

    <div className="video-list-entry">
      <img className="video-thumbnail" src={props.video.thumbnail} />
    <div className='title-and-channel'>
      <div className="video-list-entry-title">{props.video.videoName} </div>
      <div className="video-list-entry-channel">{props.video.channelTitle}</div>
    </div>
    </div>
);

export default Video;