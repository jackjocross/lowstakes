import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Flex } from 'glamor/jsxstyle';
import { Card } from './Card';
import { PostSummary } from './PostSummary';
import { MIN_WIDTH } from '../utils/constants';

export const PostItem = ({
  id,
  slug,
  title,
  publishedDate,
  description,
  image,
  ...rest
}) => (
  <Card marginBottom="20px" lastChild={{ marginBottom: '0px' }}>
    <Flex flexDirection="column" media={[MIN_WIDTH, { flexDirection: 'row' }]}>
      {image && (
        <Img
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
    </Flex>
  </Card>
);

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
