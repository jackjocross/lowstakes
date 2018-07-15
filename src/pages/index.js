import React from 'react';
import { graphql } from 'gatsby';
import PageWrapper from '../components/PageWrapper';
import Jukebox from '../components/Jukebox';
import { PostItem } from '../components/PostItem';

const Index = ({
  data: {
    allContentfulArticle: { edges },
  },
}) => (
  <PageWrapper>
    <Jukebox />
    {edges.map(({ node: article }) => (
      <PostItem key={article.id} {...article} />
    ))}
  </PageWrapper>
);

export default Index;

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
