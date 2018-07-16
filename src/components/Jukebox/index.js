import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { Block } from 'glamor/jsxstyle';
import { COLOR, GUTTER } from '../../utils/constants';
import { __SERVER__ } from '../../utils/env';
import { PostSummary } from '../PostSummary';

class Jukebox extends React.Component {
  componentDidMount() {
    const $ = require('./flipster').default; // only flipster clientside
    $('#jukebox').flipster({
      style: 'coverflow',
      scrollwheel: false,
      // touch: false,
      autoplay: false,
      loop: true,
    });
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query JukeboxQuery {
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
              <Block paddingBottom={GUTTER.LG} height={337} id="jukebox" />
            );
          }

          const fan = [];
          edges
            .filter(({ node: { image } }) => !!image)
            .forEach(
              (edge, index) => (index % 2 ? fan.unshift(edge) : fan.push(edge))
            );

          return (
            <Block paddingBottom={GUTTER.LG} id="jukebox">
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
                        <Block
                          lineHeight={0}
                          borderRadius={3}
                          overflow="hidden"
                        >
                          <Img
                            resolutions={image.resolutions}
                            alt={image.description}
                          />
                        </Block>
                      )}
                      <Block
                        opacity={0}
                        position="absolute"
                        top={0}
                        left={0}
                        width={300}
                        height={300}
                        background="rgba(0,0,0,.5)"
                        transition="all 350ms ease-in-out"
                        borderRadius={3}
                        overflow="hidden"
                        css={{
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
                      </Block>
                    </li>
                  )
                )}
              </ul>
            </Block>
          );
        }}
      />
    );
  }
}

export default Jukebox;
