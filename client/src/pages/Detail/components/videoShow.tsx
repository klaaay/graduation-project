import React, { Component } from 'react';

import '../styles/videoShow.css';

import $ from 'jquery';
import JGallery from 'jgallery';
import videoString from '@/utils/videoString';

interface IVideoShow {
  video: { video: string; thumb: string; alt: string }[];
}

export default class videoShow extends Component<IVideoShow> {
  componentDidMount = () => {
    $('.myVideo').css('height', $(window).height() - 90);
    const items = videoString(this.props.video);
    document.querySelector('#gallery').appendChild(
      JGallery.create([
        {
          title: 'Video',
          items: items
        }
      ]).getElement()
    );
  };

  render() {
    return <div id="gallery" className="myVideo" />;
  }
}
