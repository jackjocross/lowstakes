import React from 'react';
import { graphql } from 'gatsby';
import PageWrapper from '../components/PageWrapper';
import { PostItem } from '../components/PostItem';

const Archive = ({
  data: {
    allContentfulArticle: { edges },
  },
}) => (
  <PageWrapper>
    {edges.map(({ node: article }) => (
      <PostItem key={article.id} {...article} />
    ))}
  </PageWrapper>
);

export default Archive;

export const query = graphql`
  query ArchiveQuery {
    allContentfulArticle(sort: { fields: [publishedDate], order: DESC }) {
      edges {
        node {
          id
          ...PostItem
        }
      }
    }
  }
`;
