import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery, Link } from 'gatsby';
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
      color: COLOR.PRIMARY,
      textDecoration: 'none',
      '&:hover': { color: COLOR.SECONDARY },
    }}
    {...props}
  />
);

export const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query Layout {
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
        </Helmet>
        <div
          css={{
            width: '100%',
            fontFamily: SYSTEM_FONTS,
            lineHeight: '1.58',
          }}
        >
          <div
            css={{
              maxWidth: '750px',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: `${GUTTER.SM}px ${GUTTER.MD}px`,
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
                display: 'none',
                [MIN_WIDTH]: {
                  display: 'block',
                },
              }}
            >
              <HeaderLink to="/">{title}</HeaderLink>
            </div>
            <div
              css={{
                fontSize: FONT_SIZE.XL,
                fontWeight: 200,
                fontStyle: 'italic',
                display: 'block',
                [MIN_WIDTH]: {
                  display: 'none',
                },
              }}
            >
              <HeaderLink to="/">LS</HeaderLink>
            </div>
            <div>
              <div css={{ display: 'inline-block' }}>
                <HeaderLink to="/research">Research</HeaderLink>
              </div>
              <div css={{ display: 'inline-block', marginLeft: GUTTER.MD }}>
                <HeaderLink to="/opinion">Opinion</HeaderLink>
              </div>
              <div css={{ display: 'inline-block', marginLeft: GUTTER.MD }}>
                <HeaderLink to="/jukebox">Jukebox</HeaderLink>
              </div>
            </div>
          </div>
          <div>{children}</div>
          <div css={{ height: 100 }} />
        </div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
};
