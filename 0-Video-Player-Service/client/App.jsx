import React from "react";
import ReactDOM from "react-dom";

import CommentsSection from './components/CommentsSection.jsx'
import SearchBar from './components/SearchBar.jsx'
import VideoList from './components/VideoList.jsx'
import VideoPlayer from './components/VideoPlayer.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: null,
      search: ''
    };
  }

  formatLikesAndDislikesCount(num) {
    if (num > 999999) {
     return (num/1000000).toFixed(1) + 'm'
   } else if (num > 999) {
     return (num/1000).toFixed(1) + 'k'
   } else {
     return num
   }
 }

  componentDidMount() {
    fetch('/video-player-service/api/get-video')
      .then(res => res.json())
      .then(
        (result) => {
          result.numberOfDislikes = this.formatLikesAndDislikesCount(result.numberOfDislikes)
          result.numberOfLikes = this.formatLikesAndDislikesCount(result.numberOfLikes)
          result.viewCount = Number(result.viewCount).toLocaleString()
          this.setState({
            video: result
          });
        }
      )
  }

  
  handleSearchInput(event) {
    event.preventDefault();
    this.setState({
      search: event.target.value
    })
  }

  render() {
    return (
      <div>
        <SearchBar handleSearchInput={this.handleSearchInput.bind(this)} />
        <div >
          <div className="row">
            <div className="col-xl-8">
              <VideoPlayer video={this.state.video} />
              <CommentsSection />
            </div>
            <div className="col-xl-4">
              <VideoList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
