import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import Img from 'gatsby-image';
import { Flipped } from 'react-flip-toolkit';
import { formatDistance } from 'date-fns';
import { IoIosArrowThinRight } from 'react-icons/lib/io';
import { __SERVER__ } from '../../utils/env';
import { GUTTER, COLOR, FONT_SIZE, FONT_WEIGHT } from '../../utils/constants';
import { LinkArea } from '../LinkArea';

class Flipster extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line global-require
    const $ = require('./flipster').default; // only flipster clientside
    $('#flipster').flipster({
      style: 'coverflow',
      scrollwheel: false,
      autoplay: 3000,
      loop: true,
    });
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query FlipsterQuery {
            allContentfulArticle(
              sort: { fields: [publishedDate], order: DESC }
              limit: 9
            ) {
              edges {
                node {
                  id
                  slug
                  title
                  description
                  publishedDate
                  image {
                    description
                    resolutions(width: 300, height: 300) {
                      ...GatsbyContentfulResolutions
                    }
                  }
                }
              }
            }
          }
        `}
        render={({ allContentfulArticle: { edges } }) => {
          if (__SERVER__) {
            return (
              <div
                id="flipster"
                css={{ paddingBottom: GUTTER.LG, height: 337 }}
              />
            );
          }

          const fan = [];
          edges
            .filter(({ node: { image } }) => !!image)
            .forEach(
              (edge, index) => (index % 2 ? fan.unshift(edge) : fan.push(edge))
            );

          return (
            <div id="flipster" css={{ paddingBottom: GUTTER.LG }}>
              <ul>
                {fan.map(
                  ({
                    node: {
                      id,
                      slug,
                      title,
                      description,
                      publishedDate,
                      image,
                    },
                  }) => (
                    <li key={id}>
                      <LinkArea>
                        {({ link }) => (
                          <>
                            {image && (
                              <Flipped>
                                <div
                                  css={{
                                    lineHeight: 0,
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                  }}
                                >
                                  <Img
                                    resolutions={image.resolutions}
                                    alt={image.description}
                                  />
                                </div>
                              </Flipped>
                            )}
                            <div
                              css={{
                                opacity: 0,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: 300,
                                height: 300,
                                background: 'rgba(0,0,0,.5)',
                                transition: 'all 350ms ease-in-out',
                                borderRadius: 3,
                                overflow: 'hidden',
                                cursor: 'pointer',
                                '.flipster__item--current &': {
                                  opacity: 1,
                                },
                              }}
                            >
                              <div
                                css={{
                                  position: 'relative',
                                  padding: GUTTER.LG,
                                  maxHeight: `calc(100% - ${2 * GUTTER.LG}px)`,
                                }}
                              >
                                <Link
                                  to={slug}
                                  state={{ takeover: true }}
                                  style={{ textDecoration: 'none' }}
                                  innerRef={link}
                                >
                                  <div
                                    css={{
                                      fontSize: FONT_SIZE.LG,
                                      fontWeight: FONT_WEIGHT.BOLD,
                                      color: COLOR.INVERSE,
                                      paddingBottom: GUTTER.SM,
                                      ':hover': { textDecoration: 'underline' },
                                    }}
                                  >
                                    {title}
                                  </div>
                                </Link>
                                <div
                                  css={{
                                    fontSize: FONT_SIZE.SM,
                                    color: COLOR.SECONDARY,
                                    paddingBottom: GUTTER.LG,
                                  }}
                                >
                                  {formatDistance(
                                    new Date(publishedDate),
                                    new Date(),
                                    {
                                      addSuffix: true,
                                    }
                                  )}
                                </div>
                                <div
                                  css={{
                                    fontSize: FONT_SIZE.SM,
                                    color: COLOR.INVERSE,
                                    lineHeight: '20px',
                                    marginBottom: GUTTER.XL,
                                  }}
                                >
                                  {description}
                                </div>
                                <Link
                                  to={slug}
                                  state={{ takeover: true }}
                                  style={{ textDecoration: 'none' }}
                                >
                                  <div
                                    css={{
                                      display: 'flex',
                                      position: 'absolute',
                                      bottom: GUTTER.MD,
                                      right: GUTTER.MD,
                                      padding: GUTTER.SM,
                                      alignItems: 'center',
                                      fontSize: FONT_SIZE.XS,
                                      fontWeight: FONT_WEIGHT.BOLDER,
                                      color: COLOR.INVERSE,
                                      textTransform: 'uppercase',
                                      ':hover': { textDecoration: 'underline' },
                                    }}
                                  >
                                    Read more
                                    <IoIosArrowThinRight size={30} />
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </>
                        )}
                      </LinkArea>
                    </li>
                  )
                )}
              </ul>
            </div>
          );
        }}
      />
    );
  }
}

export default Flipster;
