import React from "react";
import ReactDOM from "react-dom";
import bar from './bar';
import VideoList from './list-component.jsx';
import $ from 'jquery';
bar();

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      videos: [],
    }
    this.updateVideos = this.updateVideos.bind(this);
  }


  componentDidMount() {
    $.ajax({
      url: 'http://127.0.0.1:3000/videos',
      type: 'GET',
      success: (data)=>{
          this.setState({ videos: data })
    }
  })
}

  fetch() {
    $.ajax({
      url: 'http://127.0.0.1:3000/videos',
      type: 'GET',
      success: (data)=>{
          this.setState({
            videos: data

          });

        }

    })
  }


  updateVideos() {

    $.ajax({
      url: 'http://127.0.0.1:3000/videos',
      type: 'GET',
      success: (data)=>{
        this.setState({
          videos: [
          ...this.state.videos,
          ...data
          ]
        })


        }

    })
  }


  render() {
    return (
      <div>
       <h1> Rendering through react</h1>
       <VideoList videos={this.state.videos} onClick ={this.updateVideos}/>
       </div>
        )
   }
}

    export default App;

    ReactDOM.render(<App/>, document.getElementById("app-test") || document.createElement('div'));



