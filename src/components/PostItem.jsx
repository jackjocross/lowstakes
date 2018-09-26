import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import { Flipped } from 'react-flip-toolkit';
import { formatDistance } from 'date-fns';
import { LinkArea } from './LinkArea';
import { Article } from '../utils/types';
import {
  GUTTER,
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  MIN_WIDTH,
  FLIP,
} from '../utils/constants';
import { AnimateAfterFlip } from './Animate/AfterFlip';

export class PostItem extends React.Component {
  static propTypes = Article;

  state = {
    flipping: FLIP.WAIT,
  };

  handleStart = () => this.setState({ flipping: FLIP.START });

  handleComplete = () => this.setState({ flipping: FLIP.COMPLETE });

  render() {
    const { slug, title, publishedDate, description, image } = this.props;
    const { flipping } = this.state;

    return (
      <LinkArea
        css={{
          marginBottom: '20px',
        }}
      >
        {({ link }) => (
          <div
            css={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              borderStyle: 'solid',
              borderColor: '#eaecee',
              borderWidth: '1px',
              borderRadius: 0,
              margin: `0 ${GUTTER.SM}px`,
              [MIN_WIDTH]: {
                margin: 0,
              },
            }}
          >
            {image && (
              <Flipped flipId={`${slug}-photo`}>
                <div>
                  <Img
                    sizes={image.sizes}
                    alt={image.description}
                    css={{
                      display: 'block',
                      width: '100%',
                      height: 0,
                      paddingTop: '100%',
                      objectFit: 'cover',
                      overflow: 'hidden',
                      borderRadius: '3px 3px 0 0',
                      [MIN_WIDTH]: {
                        paddingTop: '60%',
                      },
                    }}
                  />
                </div>
              </Flipped>
            )}
            <Flipped
              flipId={`${slug}-card`}
              onStart={this.handleStart}
              onComplete={this.handleComplete}
            >
              <div
                css={{
                  height: '100%',
                  background: '#fff',
                  borderRadius: image ? '0 0 3px 3px' : '3px',
                  fontSize: FONT_SIZE.MD,
                  [MIN_WIDTH]: {
                    fontSize: FONT_SIZE.LG,
                  },
                }}
              >
                <div
                  css={{
                    position: 'relative',
                    padding: GUTTER.LG,
                  }}
                >
                  <Flipped inverseFlipId={`${slug}-card`}>
                    <div>
                      <Flipped flipId={`${slug}-title`}>
                        <div>
                          <Flipped inverseFlipId={`${slug}-title`} scale>
                            <div
                              css={{
                                marginBottom: GUTTER.SM,
                              }}
                            >
                              <Link
                                to={slug}
                                innerRef={link}
                                css={{
                                  fontSize: FONT_SIZE.LG,
                                  fontWeight: FONT_WEIGHT.BOLD,
                                  color: COLOR.PRIMARY,
                                  textDecoration: 'none',
                                  ':hover': { textDecoration: 'underline' },
                                }}
                              >
                                {title}
                              </Link>
                            </div>
                          </Flipped>
                        </div>
                      </Flipped>
                    </div>
                  </Flipped>
                  <AnimateAfterFlip
                    flipping={flipping}
                    from={{
                      opacity: 0,
                      transform: 'translateY(15px)',
                    }}
                    to={{ opacity: 1, transform: 'translateY(0px)' }}
                  >
                    <div
                      css={{
                        fontSize: FONT_SIZE.SM,
                        color: COLOR.SECONDARY,
                        paddingBottom: GUTTER.LG,
                      }}
                    >
                      {formatDistance(new Date(publishedDate), new Date(), {
                        addSuffix: true,
                      })}
                    </div>
                    <div
                      css={{
                        fontSize: FONT_SIZE.SM,
                        color: COLOR.TERTIARY,
                        lineHeight: '20px',
                      }}
                    >
                      {description}
                    </div>
                  </AnimateAfterFlip>
                </div>
              </div>
            </Flipped>
          </div>
        )}
      </LinkArea>
    );
  }
}

export const query = graphql`
  fragment PostItem on ContentfulArticle {
    id
    slug
    title
    description
    publishedDate
    image {
      description
      sizes {
        ...GatsbyContentfulSizes
      }
    }
  }
`;
