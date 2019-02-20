import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import App from './client/src/index.jsx';
import Adapter from "enzyme-adapter-react-16";
import Video from "./client/src/NewVideo.jsx";
import VideoList from "./client/src/list-component";
import  mongoose from "./db/index.js";
const request = require('supertest');
const express = require('express');
import app from "./server/index.js";

Enzyme.configure({adapter: new Adapter() });

const exampleVideoData = [{
  kind: 'youtube#searchResult',
  etag: 'abQHWywil_AkNqdqji7_FqiK-u4/Ykxo_CqKu8F8kcm-iNgL332gQTY',
  id: {
    kind: 'youtube#video',
    videoId: '4ZAEBxGipoA'
  },
  snippet: {
    publishedAt: '2015-08-02T20:52:58.000Z',
    channelId: 'UCJbPGzawDH1njbqV-D5HqKw',
    title: 'React JS Tutorial for Beginners - 1 - Introduction',
    description: 'My website - https://www.thenewboston.com/videos.php Have questions about the tutorial or React? Ask them here ...',
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/4ZAEBxGipoA/default.jpg',
        width: 120,
        height: 90
      },
      medium: {
        url: 'https://i.ytimg.com/vi/4ZAEBxGipoA/mqdefault.jpg',
        width: 320,
        height: 180
      },
      high: {
        url: 'https://i.ytimg.com/vi/4ZAEBxGipoA/hqdefault.jpg',
        width: 480,
        height: 360
      }
    },
    channelTitle: 'thenewboston',
    liveBroadcastContent: 'none'
  }
}];




describe('server', ()=>{
  test('server runs', ()=>{
    request(app)
  .get('/videos')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

  })
  test('server 404s bad request', (done)=>{
    request(app)
    .get('/videos123')
    .then((response)=>{
      expect(response.statusCode).toBe(404);
      done()
    })
  })
  test('reaches database with GET request',(done)=>{
    jest
    .spyOn(mongoose, 'fetch')
    .mockReturnValue(Promise.resolve(exampleVideoData[0]));

    request(app)
    .get('/videos')
    .expect(200, done)
  })

})


describe('Main App', ()=>{
  test('renders', ()=>{
    const wrapper = mount(<App props={exampleVideoData}/>);
    expect(wrapper.exists()).toBe(true);
  })
  test('VideoList Renders', ()=>{
    const wrapper = mount(<App props={exampleVideoData}/>);
    expect(wrapper.find('.video-list')).toHaveLength(1);
  })
})



describe('VideoList', ()=>{
  test('VideoList renders videos', ()=>{
    const wrapper = mount(<App props={exampleVideoData}/>);
    expect(wrapper.find('.video-list').children()).toHaveLength(1);
  })
  test('VideoList should render with button', ()=>{
    const wrapper = mount(<App props={exampleVideoData}/>);
    expect(wrapper.find('button')).toHaveLength(1)
  })
})






