import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Flipped } from 'react-flip-toolkit';
import {
  GUTTER,
  FONT_SIZE,
  FLIP,
  MIN_WIDTH,
  FONT_WEIGHT,
  COLOR,
} from '../utils/constants';
import { Article } from '../utils/types';
import { Layout } from '../layouts';
import { AnimateAfterFlip } from '../components/Animate/AfterFlip';

export default class Post extends React.Component {
  static propTypes = {
    data: PropTypes.shape({ contentfulArticle: Article }).isRequired,
  };

  state = { flipping: FLIP.WAIT };

  handleStart = () => this.setState({ flipping: FLIP.START });

  handleComplete = () => this.setState({ flipping: FLIP.COMPLETE });

  render() {
    const {
      data: {
        contentfulArticle: {
          slug,
          image,
          title,
          body: {
            childMarkdownRemark: { html },
          },
        },
      },
    } = this.props;
    const { flipping } = this.state;

    return (
      <Layout>
        {image && (
          <Flipped flipId={`${slug}-photo`}>
            <div>
              <Img
                sizes={image.sizes}
                alt={image.description}
                css={{
                  width: '100%',
                  height: 0,
                  paddingTop: '100%',
                  objectFit: 'cover',
                  [MIN_WIDTH]: {
                    paddingTop: '60%',
                  },
                }}
              />
            </div>
          </Flipped>
        )}

        <div />
        <Flipped
          flipId={`${slug}-card`}
          onStart={this.handleStart}
          onComplete={this.handleComplete}
        >
          <div css={{ background: COLOR.INVERSE }}>
            <Flipped inverseFlipId={`${slug}-card`}>
              <div
                css={{ maxWidth: 750, margin: '0 auto', padding: GUTTER.LG }}
              >
                <Flipped flipId={`${slug}-title`}>
                  <div>
                    <Flipped inverseFlipId={`${slug}-title`} scale>
                      <div
                        css={{
                          paddingBottom: GUTTER.LG,
                          fontSize: FONT_SIZE.XL,
                          fontWeight: FONT_WEIGHT.BOLD,
                        }}
                      >
                        {title}
                      </div>
                    </Flipped>
                  </div>
                </Flipped>

                <AnimateAfterFlip
                  flipping={flipping}
                  from={{
                    opacity: 0,
                    transform: 'translate3d(0px, 15px, 0px)',
                  }}
                  to={{ opacity: 1, transform: 'translate3d(0px, 0px, 0px)' }}
                >
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </AnimateAfterFlip>
              </div>
            </Flipped>
          </div>
        </Flipped>
      </Layout>
    );
  }
}

export const query = graphql`
  query PostQuery($slug: String!) {
    contentfulArticle(slug: { eq: $slug }) {
      title
      id
      slug
      title
      description
      body {
        childMarkdownRemark {
          html
        }
      }
      publishedDate
      image {
        description
        sizes {
          ...GatsbyContentfulSizes
        }
      }
    }
  }
`;
