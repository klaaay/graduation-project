import React, { Component } from 'react';

import '../styles/imgShow.css';

import $ from 'jquery';

import ImageGallery from 'react-image-gallery';

interface IImgShow {
  pic: {
    original: string;
    thumbnail: string;
    originalClass: string;
    originalTitle: string;
    thumbnailTitle: string;
  }[];
}

export default class imgShow extends Component<IImgShow> {
  render() {
    return (
      <ImageGallery
        items={this.props.pic}
        showPlayButton={false}
        showFullscreenButton={false}
        autoPlay={false}
        onImageLoad={() => {
          $('.image-gallery-image>img').css('height', $(window).height() - 240);
        }}
      />
    );
  }
}
