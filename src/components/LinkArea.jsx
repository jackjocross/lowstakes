// Although the div is interactive, there is a matching anchor tag
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';

const CLICK_THRESHOLD = 200;

export class LinkArea extends React.Component {
  down = 0;

  up = 0;

  // @todo update gatsby-link to accept React.RefObject
  // https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-link/src/index.js#L71-L80
  handleRef = link => {
    this.link = link;
  };

  handleMouseDown = () => {
    this.down = +new Date();
  };

  handleMouseUp = ({ target }) => {
    this.up = +new Date();
    if (
      this.link &&
      this.link !== target &&
      this.up - this.down < CLICK_THRESHOLD
    ) {
      this.link.click();
    }
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <div
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        {...rest}
      >
        {children({ link: this.handleRef })}
      </div>
    );
  }
}
