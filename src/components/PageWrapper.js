import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Link from 'gatsby-link';
import { Helmet } from 'react-helmet';
import Waypoint from 'react-waypoint';
import css from 'glamor';
import { Block, Flex, InlineBlock } from 'glamor/jsxstyle';
import posed from 'react-pose';
import {
  COLOR,
  GUTTER,
  SYSTEM_FONTS,
  MIN_WIDTH,
  FONT_SIZE,
} from '../utils/constants';
import { __BROWSER__ } from '../utils/env';

const HeaderLink = props => (
  <Link
    css={{
      color: COLOR.TERTIARY,
      textDecoration: 'none',
      '&:hover': { color: COLOR.SECONDARY },
    }}
    {...props}
  />
);

const SlideDown = posed.div({
  // visible: { top: 0 },
  // hidden: { top: '-100px' },
  visible: {
    y: '0px',
    transition: {
      duration: 200,
      ease: 'linear',
    },
  },
  hidden: { y: '-100px' },
});

export class PageWrapper extends React.Component {
  state = {
    showStickyNav: false,
  };

  toggleStickyNav = ({ currentPosition }) => {
    if (currentPosition === 'inside') {
      this.setState({ showStickyNav: false });
    } else {
      this.setState({ showStickyNav: true });
    }
  };

  showStickyNav = () => this.setState({ stickyNav: true });
  hideStickyNav = () => this.setState({ stickyNav: false });

  render() {
    const { children } = this.props;
    const { showStickyNav } = this.state;

    return (
      <StaticQuery
        query={graphql`
          query PageWrapper {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={({
          site: {
            siteMetadata: { title },
          },
        }) => (
          <>
            <Helmet>
              <title>{title}</title>
              <style type="text/css">
                {`
              body {
                  background-color: #f5f7f9;
              }
            `}
              </style>
            </Helmet>
            <Block width="100%">
              <Block
                component={SlideDown}
                pose={showStickyNav ? 'visible' : 'hidden'}
                position="fixed"
                width="100%"
                zIndex={1}
                padding={`${GUTTER.SM}px ${GUTTER.LG}px`}
                media={[MIN_WIDTH, { padding: `${GUTTER.SM}px 0` }]}
                color={COLOR.INVERSE}
                backgroundColor={COLOR.TERTIARY}
                fontFamily={SYSTEM_FONTS}
              >
                <Block
                  maxWidth="750px"
                  margin="0 auto"
                  fontSize={FONT_SIZE.XL}
                  fontWeight="200"
                  fontStyle="italic"
                >
                  LS
                </Block>
              </Block>
              <Block
                maxWidth="750px"
                margin="0 auto"
                paddingBottom={GUTTER.XL}
                fontFamily={SYSTEM_FONTS}
                lineHeight="1.58"
              >
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  padding={GUTTER.LG}
                  media={[MIN_WIDTH, { padding: `${GUTTER.LG}px 0` }]}
                >
                  <Block
                    fontSize={FONT_SIZE.XL}
                    fontWeight="200"
                    fontStyle="italic"
                  >
                    <HeaderLink to="/">{title}</HeaderLink>
                  </Block>
                  <Block>
                    <InlineBlock>
                      <HeaderLink to="/archive">Archive</HeaderLink>
                    </InlineBlock>
                    <InlineBlock marginLeft={GUTTER.MD}>
                      <HeaderLink to="/about">About</HeaderLink>
                    </InlineBlock>
                  </Block>
                </Flex>
                <Waypoint onPositionChange={this.toggleStickyNav} />
                <Block>{children}</Block>
              </Block>
            </Block>
          </>
        )}
      />
    );
  }
}
