import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Layout } from '../layouts';
import { PostItem } from '../components/PostItem';
import { Article } from '../utils/types';
import { GUTTER } from '../utils/constants';

const Research = ({
  data: {
    allContentfulArticle: { edges },
  },
}) => (
  <Layout>
    <div
      css={{
        maxWidth: '750px',
        margin: `${GUTTER.MD}px auto`,
      }}
    >
      {edges.map(({ node: article }) => (
        <PostItem key={article.id} {...article} />
      ))}
    </div>
  </Layout>
);

Research.propTypes = {
  data: PropTypes.shape({
    allContentfulArticle: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({ node: Article })),
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  query ResearchQuery {
    allContentfulArticle(
      filter: { type: { eq: "research" } }
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

export default Research;
