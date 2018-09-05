import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { PageWrapper } from '../components/PageWrapper';
import Flipster from '../components/Flipster';
import { PostItem } from '../components/PostItem';
import { Article } from '../utils/types';

const Index = ({
  data: {
    allContentfulArticle: { edges },
  },
}) => (
  <PageWrapper>
    <Flipster />
    {edges.map(({ node: article }) => (
      <PostItem key={article.id} {...article} />
    ))}
  </PageWrapper>
);

Index.propTypes = {
  data: PropTypes.shape({
    allContentfulArticle: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({ node: Article })),
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  query IndexQuery {
    allContentfulArticle(
      sort: { fields: [publishedDate], order: DESC }
      limit: 9
    ) {
      edges {
        node {
          id
          image {
            description
            resolutions(width: 300, height: 300) {
              ...GatsbyContentfulResolutions
            }
          }
          ...PostItem
        }
      }
    }
  }
`;

export default Index;
