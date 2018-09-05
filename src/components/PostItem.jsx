import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import { Flipped } from 'react-flip-toolkit';
import { formatDistance } from 'date-fns';
import { IoIosArrowThinRight } from 'react-icons/lib/io';
import { Card } from './Card';
import { LinkArea } from './LinkArea';
import { Article } from '../utils/types';
import {
  GUTTER,
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  MIN_WIDTH,
} from '../utils/constants';

export const PostItem = ({
  slug,
  title,
  publishedDate,
  description,
  image,
}) => (
  <LinkArea
    css={{
      marginBottom: '20px',
      ':last-child': { marginBottom: 0 },
    }}
  >
    {({ link }) => (
      <Card
        css={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          [MIN_WIDTH]: { flexDirection: 'row' },
        }}
      >
        {image && (
          <Flipped flipId={slug}>
            <div>
              <Img
                sizes={image.sizes}
                alt={image.description}
                css={{
                  display: 'block',
                  width: '100%',
                  height: '390px',
                  [MIN_WIDTH]: { width: '330px' },
                  objectFit: 'cover',
                }}
              />
            </div>
          </Flipped>
        )}
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
                color: COLOR.PRIMARY,
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
            {formatDistance(new Date(publishedDate), new Date(), {
              addSuffix: true,
            })}
          </div>
          <div
            css={{
              fontSize: FONT_SIZE.SM,
              color: COLOR.TERTIARY,
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
                color: COLOR.TERTIARY,
                textTransform: 'uppercase',
                ':hover': { textDecoration: 'underline' },
              }}
            >
              Read more
              <IoIosArrowThinRight size={30} />
            </div>
          </Link>
        </div>
      </Card>
    )}
  </LinkArea>
);

PostItem.propTypes = Article;

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
