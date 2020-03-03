import React from 'react';

import './styles/HeadToolBar.css';

const HeadToolBar = ({ leftChild, rightChild }) => {
  return (
    <div className="head-tool-bar">
      <div className="left">{leftChild}</div>
      <div className="right">{rightChild}</div>
    </div>
  );
};

export default HeadToolBar;
