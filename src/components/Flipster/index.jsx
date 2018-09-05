import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { COLOR, GUTTER } from '../../utils/constants';
import { __SERVER__ } from '../../utils/env';
import { PostSummary } from '../PostSummary';

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
                          transition: 'all 350ms ease-in-out',
                          borderRadius: 3,
                          overflow: 'hidden',
                          '.flipster__item--current &': {
                            opacity: 1,
                          },
                        }}
                      >
                        <PostSummary
                          slug={slug}
                          title={title}
                          description={description}
                          publishedDate={publishedDate}
                          color={COLOR.INVERSE}
                        />
                      </div>
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
