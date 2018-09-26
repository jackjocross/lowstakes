import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { formatDistance } from 'date-fns';
import { __SERVER__ } from '../../utils/env';
import { GUTTER, COLOR, FONT_SIZE, FONT_WEIGHT } from '../../utils/constants';
import { SoundContext } from '../Sound/Provider';

class Flipster extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { id } = this.props;

    // eslint-disable-next-line global-require
    const $ = require('./flipster').default; // only flipster clientside
    $(`#${id}`).flipster({
      style: 'coverflow',
      scrollwheel: false,
      autoplay: 3000,
      loop: true,
    });
  }

  render() {
    const { id } = this.props;

    return (
      <StaticQuery
        query={graphql`
          query FlipsterQuery {
            allContentfulPodcast(
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
                  audio {
                    file {
                      url
                    }
                  }
                }
              }
            }
          }
        `}
        render={({ allContentfulPodcast: { edges } }) => {
          if (__SERVER__) {
            return (
              <div id={id} css={{ paddingBottom: GUTTER.LG, height: 337 }} />
            );
          }

          const fan = [edges[0], edges[0], edges[0], edges[0]];
          // edges
          //   .filter(({ node: { image } }) => !!image)
          //   .forEach(
          //     (edge, index) => (index % 2 ? fan.unshift(edge) : fan.push(edge))
          //   );

          return (
            <div id={id} css={{ paddingBottom: GUTTER.LG }}>
              <ul>
                {fan.map(
                  ({
                    node: {
                      slug,
                      title,
                      publishedDate,
                      image,
                      audio: {
                        file: { url },
                      },
                    },
                  }) => (
                    <SoundContext>
                      {({ setTrack, play }) => (
                        <li key={slug}>
                          {image && (
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
                              transition: 'opacity 350ms ease-in-out',
                              borderRadius: 3,
                              overflow: 'hidden',
                              cursor: 'pointer',
                              pointerEvents: 'none',
                              '.flipster__item--current &': {
                                opacity: 1,
                                pointerEvents: 'auto',
                              },
                            }}
                            role="button"
                            onClick={() => {
                              setTrack({ url, title });
                              play();
                            }}
                          >
                            <div
                              css={{
                                position: 'relative',
                                padding: GUTTER.LG,
                              }}
                            >
                              <div
                                css={{
                                  fontSize: FONT_SIZE.LG,
                                  fontWeight: FONT_WEIGHT.BOLD,
                                  color: COLOR.INVERSE,
                                  paddingBottom: GUTTER.SM,
                                }}
                              >
                                {title}
                              </div>
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
                            </div>
                          </div>
                        </li>
                      )}
                    </SoundContext>
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
