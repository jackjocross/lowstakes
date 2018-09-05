import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Link from 'gatsby-link';
import { Helmet } from 'react-helmet';
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
        <div css={{ width: '100%' }}>
          <div
            css={{
              maxWidth: '750px',
              margin: '0 auto',
              paddingBottom: GUTTER.XL,
              fontFamily: SYSTEM_FONTS,
              lineHeight: '1.58',
            }}
          >
            <div
              css={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: GUTTER.LG,
                [MIN_WIDTH]: {
                  padding: `${GUTTER.LG}px 0`,
                },
              }}
            >
              <div
                css={{
                  fontSize: FONT_SIZE.XL,
                  fontWeight: 200,
                  fontStyle: 'italic',
                }}
              >
                <HeaderLink to="/">{title}</HeaderLink>
              </div>
              <div>
                <div css={{ display: 'inline-block' }}>
                  <HeaderLink to="/archive">Archive</HeaderLink>
                </div>
                <div css={{ display: 'inline-block', marginLeft: GUTTER.MD }}>
                  <HeaderLink to="/about">About</HeaderLink>
                </div>
              </div>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </>
    )}
  />
);

PageWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
