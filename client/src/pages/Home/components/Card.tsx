import React, { Component } from 'react';

import Dotdotdot from 'react-dotdotdot';

import '../styles/card.css';

interface ICard {
  pic: string;
  title: string;
  description: string;
}

export default class card extends Component<ICard> {
  render() {
    return (
      <div className="my-card">
        <img alt="" className="cardPic" src={this.props.pic} />
        <div className="card-info">
          <Dotdotdot clamp={4}>
            <p>
              {this.props.title}
              <br />
              {this.props.description}
            </p>
          </Dotdotdot>
        </div>
      </div>
    );
  }
}
