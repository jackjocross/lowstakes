import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Link from 'gatsby-link';
import { Helmet } from 'react-helmet';
import { Block, Flex, InlineBlock } from 'glamor/jsxstyle';
import {
  COLOR,
  GUTTER,
  SYSTEM_FONTS,
  MIN_WIDTH,
  FONT_SIZE,
} from '../utils/constants';

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

export const PageWrapper = ({ children }) => (
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
            <Block>{children}</Block>
          </Block>
        </Block>
      </>
    )}
  />
);
