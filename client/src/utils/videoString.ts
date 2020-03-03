import JGallery from 'jgallery';

export default videos => {
  return videos.map(item => {
    return {
      element: JGallery.createElement(
        `<video src="${item.video}" controls autoplay style="width:100%;height:95%"/>`
      ),
      thumbElement: JGallery.createElement(`<img src='${item.thumb}'/>`),
      title: '',
      hash: ''
    };
  });
};
