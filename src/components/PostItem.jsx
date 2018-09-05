import React from 'react';
import { graphql } from 'gatsby';
import { Card } from './Card';
import { PostSummary } from './PostSummary';
import { MIN_WIDTH } from '../utils/constants';
import { Article } from '../utils/types';

export const PostItem = ({
  slug,
  title,
  publishedDate,
  description,
  image,
}) => (
  <Card marginBottom="20px" lastChild={{ marginBottom: '0px' }}>
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        [MIN_WIDTH]: { flexDirection: 'row' },
      }}
    >
      {image && (
        <div
          sizes={image.sizes}
          alt={image.description}
          css={{
            display: 'block',
            width: '100%',
            height: '390px',
            [`@media${MIN_WIDTH}`]: { width: '330px' },
            objectFit: 'cover',
          }}
        />
      )}
      <PostSummary
        slug={slug}
        title={title}
        description={description}
        publishedDate={publishedDate}
      />
    </div>
  </Card>
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
